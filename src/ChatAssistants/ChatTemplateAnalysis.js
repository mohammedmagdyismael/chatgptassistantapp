import { Configuration, OpenAIApi } from 'openai';
import { OpenAIApiKey } from '../Configs';
import { getChatContext } from './GetChatContext';
import { createAssistantQuestion } from './CreateAssistantQuestion';

export const dialogAnalysis = async messagesQueue => {
  const configuration = new Configuration({
    apiKey: OpenAIApiKey,
  });
  const openai = new OpenAIApi(configuration);

  // Get User Message Context
  const matchingContextsList = await getChatContext(messagesQueue, openai);
  console.log("Context: ", matchingContextsList);
  const assistantQuestion = await createAssistantQuestion(messagesQueue,matchingContextsList, openai);
  console.log("Created Assistant Message: ", assistantQuestion);
  return assistantQuestion;
}
