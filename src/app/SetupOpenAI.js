import { Configuration, OpenAIApi } from 'openai';
import { OpenAIApiKey } from './Configs';

export const setupOpenAI = () => {
    const configuration = new Configuration({
        apiKey: OpenAIApiKey,
      });
    return new OpenAIApi(configuration);
}