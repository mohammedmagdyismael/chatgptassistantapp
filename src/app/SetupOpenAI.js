import OpenAI from 'openai';
import { OpenAIApiKey } from './Configs';

export const setupOpenAI = () => {
  const client = new OpenAI({
    apiKey: OpenAIApiKey,
    dangerouslyAllowBrowser: true,
  });
    return client;
}