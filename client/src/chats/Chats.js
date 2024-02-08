import React, { useState, useEffect } from "react";
import ChatDisplay from "../chat-display/ChatDisplay";
import ChatInput from "../chat-input/ChatInput";

export default function Chats(props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* {chatsdisplay} */}
      <ChatDisplay chatID={props.id}></ChatDisplay>
      {/* Chatinput */}
      <ChatInput chatID={props.id}></ChatInput>
    </div>
  );
}
