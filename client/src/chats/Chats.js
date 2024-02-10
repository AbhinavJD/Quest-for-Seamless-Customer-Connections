import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatDisplay from "../chat-display/ChatDisplay";
import ChatInput from "../chat-input/ChatInput";

import axios from "axios";
import { toast } from "react-toastify";
import { USERS_URL } from "../constants";
export default function Chats(props) {
  // Get the ID from the URL parameter
  const userLoginData = props.userLoginData;
  const { chatID } = useParams();
  const [messages, setMessages] = useState([]);
  const updateMessages = async (event) => {
    try {
      const accessToken = localStorage.getItem("quest_auth_token");
      const accessTokenType = localStorage.getItem("quest_auth_token_type");
      // console.log(messages);
      await axios
        .get(USERS_URL + `/user/getMessages/${chatID}`, {
          headers: {
            Authorization: `${accessTokenType} ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log("Frm Chats Update Messages called");
          if (response.data.status === "ok") {
            setMessages(response.data.result["messages"]);
          } else {
            toast.error(response.data.message || "Something went wrong!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while sending the message.");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // useEffect to fetch chat IDs when the component mounts
  useEffect(() => {
    updateMessages();
  }, [chatID]);
  const updateFrontEndMessage = (userMessageObj) => {
    // Append userMessageObj to the messages array
    setMessages([...messages, userMessageObj]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* {chatsdisplay} */}
      <ChatDisplay chatID={chatID} messagesToShow={messages}></ChatDisplay>
      {/* Chatinput */}
      <ChatInput
        chatID={chatID}
        onMessageUpdate={updateMessages}
        updateFrontEnd={updateFrontEndMessage}
        userLoginData={userLoginData}
      ></ChatInput>
    </div>
  );
}
