import * as cryptoService from '../services/cryptoService.js';
import { requiredAmount, requiredString } from '../validations/common.js';

export async function createPayment(req, res) {
  const result = await cryptoService.createPayment({
    userId: req.user.id,
    amount: requiredAmount(req.body.amount),
    payCurrency: requiredString(req.body.pay_currency, 'pay_currency', 20).toLowerCase()
  });
  res.status(201).json(result);
}

export async function webhook(req, res) {
  const result = await cryptoService.handleWebhook(req.rawBody, req.headers, req.body);
  res.json(result);
}
