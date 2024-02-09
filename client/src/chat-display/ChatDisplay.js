import React, { useEffect, useRef } from "react";
import Messages from "../messages/Messages";

export default function ChatDisplay(props) {
  const chatId = props.chatID;
  const messages = props.messagesToShow;
  const chatDisplayRef = useRef(null);
  // Scroll to the bottom when messages change
  useEffect(() => {
    chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
  }, [messages]);
  return (
    <div ref={chatDisplayRef} className="flex-1 overflow-auto">
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
