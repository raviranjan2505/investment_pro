  import * as db from '../database/db.js';
  import * as planRepository from '../repositories/planRepository.js';
  import * as userRepository from '../repositories/userRepository.js';
  import * as investmentRepository from '../repositories/investmentRepository.js';
  import * as transactionRepository from '../repositories/transactionRepository.js';
  import { addPercent, toMoney } from '../utils/money.js';
  import { badRequest, notFound } from '../utils/errors.js';

  export async function invest(userId, planSlug, amount) {
    return db.withTransaction(async (client) => {
      const plan = await planRepository.findBySlug(planSlug, client);
      if (!plan) throw notFound('Investment plan not found');

      const min = Number(plan.min_amount);
      const max = Number(plan.max_amount);
      if (amount < min || amount > max) {
        throw badRequest(`Amount must be between ${min} and ${max}`);
      }

      const balance = await transactionRepository.getWalletBalance(userId, client);
      if (balance < amount) throw badRequest('Insufficient wallet balance');

      const investment = await investmentRepository.create(
        {
          userId,
          planId: plan.id,
          amount,
          returnRate: Number(plan.return_rate),
          durationDays: Number(plan.duration_days),
          expectedReturn: addPercent(amount, plan.return_rate)
        },
        client
      );

      await transactionRepository.create(
        {
          userId,
          type: 'investment',
          amount: -Math.abs(amount),
          status: 'completed',
          referenceType: 'investment',
          referenceId: investment.id,
          metadata: { plan: plan.slug }
        },
        client
      );

      const investor = await userRepository.findAuthById(userId);
      if (investor?.referred_by) {
        const bonus = toMoney((amount * Number(plan.referral_bonus_rate)) / 100);
        if (bonus > 0) {
          await transactionRepository.create(
            {
              userId: investor.referred_by,
              type: 'referral_bonus',
              amount: bonus,
              status: 'completed',
              referenceType: 'investment',
              referenceId: investment.id,
              metadata: { referred_user_id: userId, bonus_rate: plan.referral_bonus_rate }
            },
            client
          );
          await investmentRepository.markReferralPaid(investment.id, client);
        }
      }

      return investment;
    });
  }

  export async function listInvestments(userId) {
    return investmentRepository.listByUser(userId);
  }

  export async function settleMaturedInvestments() {
    return db.withTransaction(async (client) => {
      const matured = await investmentRepository.findMaturedActive(client);
      const settled = [];

      for (const investment of matured) {
        const completed = await investmentRepository.markCompleted(investment.id, client);
        if (!completed) continue;

        await transactionRepository.create(
          {
            userId: investment.user_id,
            type: 'return',
            amount: investment.expected_return,
            status: 'completed',
            referenceType: 'investment',
            referenceId: investment.id,
            metadata: { settled_at: new Date().toISOString() }
          },
          client
        );
        settled.push(completed);
      }

      return settled;
    });
  }
