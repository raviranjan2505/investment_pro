import * as walletService from '../services/walletService.js';

export async function getWallet(req, res) {
  res.json({ wallet: await walletService.getWallet(req.user.id) });
}

export async function getTransactions(req, res) {
  res.json({ transactions: await walletService.getTransactions(req.user.id) });
}
