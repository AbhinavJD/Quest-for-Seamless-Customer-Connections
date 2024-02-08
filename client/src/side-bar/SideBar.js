import React, { useEffect, useState } from "react";
import NewChat from "../new-chat/NewChat";
import AsideUsername from "../aside-comps/AsideUsername";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ChatRow from "../chatrow/ChatRow";

export default function SideBar(props) {
  const userLoginData = props.userLoginData;
  const navigate = useNavigate();
  const [chatIDs, setChatIDs] = useState([]);
  useEffect(() => {
    // Make the API call when the component mounts
    const accessToken = localStorage.getItem("quest_auth_token");
    const accessTokenType = localStorage.getItem("quest_auth_token_type");
    axios
      .get("http://localhost:80/users/allChatID", {
        headers: {
          Authorization: `${accessTokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        setChatIDs([...response.data.result.chatIDs]);
        // console.log(response.data.result.chatIDs);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  }, []);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="col-span-1 justify-between">
          <AsideUsername userLoginData={userLoginData} />
        </div>
        <div>
          {/* new chat */}
          <NewChat updateChatIDs={chatIDs}></NewChat>
        </div>
        <div>{/* Model selection */}</div>
        {/* Map the chat rows */}
        {chatIDs?.map((chatid) => (
          <ChatRow key={chatid} id={chatid}></ChatRow>
        ))}
      </div>
    </div>
  );
}
