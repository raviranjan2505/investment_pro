import { askJson } from './openaiClient.js';

export async function detectFraud({ user, activity }) {
  return askJson(
    'You are a financial fraud risk analyst. Return JSON with risk_score 0-100, risk_level, reasons array, and recommended_action.',
    JSON.stringify({ user, activity })
  );
}
