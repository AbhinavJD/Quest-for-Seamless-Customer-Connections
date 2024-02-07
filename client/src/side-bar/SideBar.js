import React from "react";
import NewChat from "../new-chat/NewChat";

export default function SideBar() {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* new chat */}
          <NewChat></NewChat>
        </div>
        <div>{/* Model selection */}</div>
        {/* Map the chat rows */}
        <div>{/* user login details */}</div>
      </div>
    </div>
  );
}
