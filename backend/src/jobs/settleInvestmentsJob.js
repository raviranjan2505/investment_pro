import * as investmentService from '../services/investmentService.js';

export async function settleInvestmentsJob() {
  const settled = await investmentService.settleMaturedInvestments();
  if (settled.length > 0) {
    console.log(`Settled ${settled.length} matured investments`);
  }
  return settled;
}
