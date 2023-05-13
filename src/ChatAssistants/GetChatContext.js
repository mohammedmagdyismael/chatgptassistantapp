import { CHAT_ROLES, delayIntervalInMillSec } from '../Configs';
import { parseText, contexts } from './helper';

export const getChatContext = async (messagesQueue, openai) => {
  let message = '';
  const contextResponse = await new Promise(resolve => {
    setTimeout(async () => {
      const resp = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: CHAT_ROLES.USER,
            content: `Mention all suitable matching context only if found from this list [${contexts.join(',')}] comma separated between square brackets \n"${messagesQueue[messagesQueue.length - 1].content}"`,
          }
        ],
      });
      resolve(resp);
    }, delayIntervalInMillSec);
  });

  message = parseText(contextResponse.data.choices[0].message.content);

  return message;
}
