import React, { useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function ChatInput(porps) {
  const chatId = porps.chatID;
  const [prompt, setPrompt] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");
    const message = {
      prompt_text: input,
      chat_id: chatId,
    };

    try {
      const accessToken = localStorage.getItem("quest_auth_token");
      const accessTokenType = localStorage.getItem("quest_auth_token_type");

      const response = await axios.post(
        "http://localhost:80/user/prompt",
        message,
        {
          headers: {
            Authorization: `${accessTokenType} ${accessToken}`,
          },
        }
      );

      if (response.data.code === "200") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the message.");
    }
  };
  return (
    <div className="bg-gray-700 text-white rounded-lg text-sm m-3">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here...."
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        ></input>
        <button
          type="submit"
          disabled={!prompt}
          className=" hover:opacity-50 text-[#11A37F] font-bold disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
