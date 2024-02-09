import React from "react";

import bot from "../images/bot.png";
export default function Messages(props) {
  const messages = props.message;
  const isBot = messages.user.name === "AI Bot";
  // Define the avatar src based on whether it's a bot or not
  const avatarSrc = isBot ? bot : messages.user.user_avatar;

  return (
    <div className={`py-5 text-white ${isBot && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={avatarSrc} alt="" className="h-8 w-8"></img>
        <p className="pt-1 text-sm">{messages.prompt_text}</p>
      </div>
    </div>
  );
}
