import { CHAT_ROLES, delayIntervalInMillSec } from '../Configs';
import { specialties, reservatioTemplate } from './helper';
import { fillReservationTemplate } from './FillReservationTemplat';

export const createAssistantQuestion = async (messagesQueue, matchingContextsList, openai) => {
  let message = '';

  const contextQueries = {
    "greeting": "Create a greeting statement to user using Vezeeta",
    "booking request": "Create a question asks the patient about symptoms",
    "symptoms definition": `Tell the user what's the suitable matching specialty only from this list ${specialties} \n for this response "${messagesQueue[messagesQueue.length - 1].content}" and ask him for his name to book an appointment`,
    "personal name": "Create a question Ask the user for his phone number",
    "phone number": "Create a question Ask the user about his address location",
    "location": "Create a question Ask the user for the proper booking time",
    "time": "Create a question Ask the user for the prefered doctor gender",
    "gender": "Create a question Ask the user for the prefered doctor Professional title if Professor, Lecturer, Consultant or Specialist ",
    "professional title": "Create a question Ask the user for his insurance company",
    "insurance company": "Tell the to select A doctor from these preferences"
  };

  let messages = [];
  if (matchingContextsList.length && matchingContextsList[0] && contextQueries[String(matchingContextsList[0]).toLowerCase()]) {
    messages = [
      {
        role: CHAT_ROLES.USER,
        content: contextQueries[String(matchingContextsList[0]).toLowerCase()],
      }
    ]
  } else {
    messages = [
      ...messagesQueue,
      {
        role: CHAT_ROLES.USER,
        content: `The Assistant Tells the user that we will book an appointment in about 5 min and thanks the patient in the name of vezeeta and The assistant fill in this template then print it \n ${reservatioTemplate} and dont' write this "[Your name]"`,
      }];
  }


  const contextQueryResponse = await new Promise(resolve => {
    setTimeout(async () => {
      const resp = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      resolve(resp);
    }, delayIntervalInMillSec);
  });

  message = String(contextQueryResponse.data.choices[0].message.content).replace('"', '');
  return message;
}
