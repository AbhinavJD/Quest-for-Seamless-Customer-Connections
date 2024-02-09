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
      {messages?.length == 0 && (
        <>
          <div>
            <p className="mt-10 text-center text-white">
              Type a prompt in below to get started!
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mx-auto mt-5 text-white animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </>
      )}
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
