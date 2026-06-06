import cron from 'node-cron';
import { settleInvestmentsJob } from '../jobs/settleInvestmentsJob.js';

export function startInvestmentCron() {
  cron.schedule('0 0 * * *', async () => {
    try {
      await settleInvestmentsJob();
    } catch (error) {
      console.error('Investment settlement cron failed:', error);
    }
  });
}
