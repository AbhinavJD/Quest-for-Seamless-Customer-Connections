import React from "react";
import Messages from "../messages/Messages";

export default function ChatDisplay(props) {
  const chatId = props.chatID;
  const messages = props.messagesToShow;
  return (
    <div className="flex-1 overflow-auto">
      {messages?.map((message) => (
        <Messages
          message={message}
          key={message.createdAt}
          id={message.createdAt}
        ></Messages>
      ))}
    </div>
  );
}
