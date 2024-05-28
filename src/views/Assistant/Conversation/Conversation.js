import React from "react";
import { CHAT_ROLES } from '../../../app/Configs';

const Conversation = ({ ...props }) => {
    const { messages } = props;

    return (
        <div className='chat-list'>
          {messages.map((message, index) => {
            if (message.role !== CHAT_ROLES.SYSTEM) {
              if (message.content) {
                return (
                  <div key={index}>
                    <p className={message.role === CHAT_ROLES.USER ? 'role-user' : 'role-assistant'}>
                      {message.role}
                    </p>

                    <p className={`${message.role}-message`}>
                        {message.content}
                    </p>
                  </div>
                )
              }
            }
            return '';
            })}
        </div>
    )
}

export default Conversation;
