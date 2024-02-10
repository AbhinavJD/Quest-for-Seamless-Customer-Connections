import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { USERS_URL } from "../constants";
export default function ChatRow(props) {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const id = props.id;
  const message = props.message;
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName, id]);

  const removeChat = async () => {
    try {
      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem("quest_auth_token");
      const accessTokenType = localStorage.getItem("quest_auth_token_type");

      // Call the delete_chat API endpoint
      const response = await axios.delete(USERS_URL + `/users/chat/${id}`, {
        headers: {
          Authorization: `${accessTokenType} ${accessToken}`,
        },
      });

      // Check the response status code
      if (response.status === 200) {
        toast.success(response.data.message);
        // Call the onChatDeleted function passed down from SideBar component
        props.onChatDeleted(id);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
      toast.error("An error occurred while deleting the chat.");
    }
  };
  return (
    <Link
      to={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-600"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
      <p className="flex-1 hidden md:inline-flex truncate">
        {message ? message : "New Chat"}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 text-gray-700 hover:text-red-700"
        onClick={removeChat}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </Link>
  );
}
