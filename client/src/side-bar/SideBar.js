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

  // Function to fetch chat IDs from the server
  const fetchChatIDs = async () => {
    const accessToken = localStorage.getItem("quest_auth_token");
    const accessTokenType = localStorage.getItem("quest_auth_token_type");
    await axios
      .get("http://localhost:80/users/allChatID", {
        headers: {
          Authorization: `${accessTokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.code === "200") {
          setChatIDs(response.data.result.chatIDs);
        }
      })
      .catch((error) => {
        // add error notif

        console.log(error);
      });
  };

  // useEffect to fetch chat IDs when the component mounts
  useEffect(() => {
    fetchChatIDs();
  }, []);

  // Function to update chat IDs state when a chat is deleted
  const handleChatDeleted = (deletedChatID) => {
    console.log(deletedChatID);
    setChatIDs((prevChatIDs) => {
      // Filter out the deleted chat ID
      return prevChatIDs.filter((chatID) => chatID.chatid !== deletedChatID);
    });
    //move to sign in page
    console.log(chatIDs);
    navigate("/home");
  };

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
          <ChatRow
            key={chatid.chatid}
            id={chatid.chatid}
            message={chatid?.messages?.prompt_text}
            onChatDeleted={handleChatDeleted}
          ></ChatRow>
        ))}
        <div className="text-white flex justify-end absolute bottom-0 p-5 col-span-1">
          Logout
        </div>
      </div>
    </div>
  );
}
