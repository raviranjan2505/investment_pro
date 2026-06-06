import * as investmentService from '../services/investmentService.js';
import { requiredAmount } from '../validations/common.js';

export async function invest(req, res) {
  const amount = requiredAmount(req.body.amount);
  const investment = await investmentService.invest(req.user.id, req.params.plan, amount);
  res.status(201).json({
  success: true,
  data: investment
});
}

export async function listInvestments(req, res) {
  res.json({ investments: await investmentService.listInvestments(req.user.id) });
}
