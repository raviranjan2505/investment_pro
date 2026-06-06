import { askText } from './openaiClient.js';

export async function supportChat({ user, message }) {
  return askText(
    'You are a concise support assistant for an investment platform. Do not provide financial guarantees. Encourage users to review risks.',
    JSON.stringify({ user, message })
  );
}
