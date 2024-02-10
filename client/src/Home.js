import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HomeChatWindow from "./home-chat-window/HomeChatWindow";
import SideBar from "./side-bar/SideBar";
import { Route, Routes } from "react-router-dom";
import Chats from "./chats/Chats";
export default function Home(props) {
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState(null);
  // Retrieve access token from localStorage
  const accessToken = localStorage.getItem("quest_auth_token");
  const accessTokenType = localStorage.getItem("quest_auth_token_type");
  useEffect(() => {
    // Make the API call when the component mounts
    axios
      .get("http://localhost:80/users", {
        headers: {
          Authorization: `${accessTokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        // Set the user data in the state
        setUserLoginData(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching user data:", error);
        // saving token to local storage
        localStorage.removeItem("quest_auth_token");
        localStorage.removeItem("quest_auth_token_type");
        // move to sign in page
        navigate("/?login");
        // reload page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  }, []);
  return (
    // <div className="fixed flex flex-col-3 top-0 left-0 w-70 bg-gray-900 h-full shadow-lg">
    //   {userData ? <AsideUsername userdata={userData} /> : <p>Loading...</p>}
    // </div>
    <div className="flex">
      <React.Fragment>
        <div className=" bg-slate-800 max-w-xs h-screen overflow-y-auto md:min-w-[15rem]">
          <SideBar userLoginData={userLoginData} />
        </div>
      </React.Fragment>
      {/* right side bar */}
      <React.Fragment>
        <div className="flex-1 bg-slate-600 h-screen">
          <Routes>
            <Route path="/home" element={<HomeChatWindow />}></Route>
            <Route
              path="/chat/:chatID"
              element={<Chats userLoginData={userLoginData} />}
            />
          </Routes>
        </div>
      </React.Fragment>
    </div>
  );
}
