import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatDisplay from "../chat-display/ChatDisplay";
import ChatInput from "../chat-input/ChatInput";

export default function Chats(props) {
  // Get the ID from the URL parameter
  const { chatID } = useParams();
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* {chatsdisplay} */}
      <ChatDisplay chatID={chatID}></ChatDisplay>
      {/* Chatinput */}
      <ChatInput chatID={chatID}></ChatInput>
    </div>
  );
}
