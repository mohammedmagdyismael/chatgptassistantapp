import { CHAT_ROLES, delayIntervalInMillSec } from '../app/Configs';
import { parseText, reservatioTemplate } from './helper';


export const fillReservationTemplate = async (messagesQueue, openai) => {
    let message = '';
    const contextResponse = await new Promise(resolve => {
      setTimeout(async () => {
        const resp = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            ...messagesQueue,
            {
              role: CHAT_ROLES.USER,
              content: `Fill in this template from the previous conversation start the template with # and  end the template with # \n ${reservatioTemplate}`,
            }
          ],
        });
        resolve(resp);
      }, delayIntervalInMillSec);
    });
  
    message = parseText(contextResponse.data.choices[0].message.content);
  
    return message;
  }
  