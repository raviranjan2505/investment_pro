import { askJson } from './openaiClient.js';

export async function suggestPlan({ user, plans, wallet }) {
  return askJson(
    'Suggest a suitable investment plan. Return JSON with suggested_plan_slug, rationale, risk_notes, and alternative_plan_slug.',
    JSON.stringify({ user, plans, wallet })
  );
}
