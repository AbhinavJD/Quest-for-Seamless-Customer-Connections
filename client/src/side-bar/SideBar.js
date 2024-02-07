import React from "react";
import NewChat from "../new-chat/NewChat";
import AsideUsername from "../aside-comps/AsideUsername";

export default function SideBar(props) {
  const userLoginData = props.userLoginData;
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="col-span-1 justify-between">
          <AsideUsername userLoginData={userLoginData} />
        </div>
        <div>
          {/* new chat */}
          <NewChat></NewChat>
        </div>
        <div>{/* Model selection */}</div>
        {/* Map the chat rows */}
      </div>
    </div>
  );
}
