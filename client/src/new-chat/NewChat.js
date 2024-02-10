import React from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { USERS_URL } from "../constants";

export default function NewChat(props) {
  let chatIds = props.updateChatIDs;
  const navigate = useNavigate();
  const createNewChat = async (event) => {
    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem("quest_auth_token");
    const accessTokenType = localStorage.getItem("quest_auth_token_type");
    event.preventDefault();
    // call api login
    await axios
      .get(USERS_URL + "/users/newChat", {
        headers: {
          Authorization: `${accessTokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.code !== "200") {
          toast.error(response.data.message);
        } else if (response.data.code === "200") {
          toast.success(response.data.message);

          // move to sign in page
          console.log(response.data);
          chatIds.push(response.data.result.newChatId);
          navigate(`/chat/${response.data.result.newChatId.chatid}`);
          //   // reload page
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1000);
        } else {
          toast.success("Something went wrong!");
        }
      })
      .catch((error) => {
        // add error notif

        console.log(error);
      });
  };
  return (
    <div
      className={`border-gray-700 border chatRow text-white ${props.className}`}
      onClick={createNewChat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <p>New Chat</p>
    </div>
  );
}
