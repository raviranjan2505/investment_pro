import * as transactionRepository from '../repositories/transactionRepository.js';

export async function getWallet(userId) {
  const balance = await transactionRepository.getWalletBalance(userId);
  return { balance };
}

export async function getTransactions(userId) {
  return transactionRepository.listByUser(userId);
}
