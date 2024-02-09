import React, { useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function ChatInput(props) {
  const timestamp = new Date();
  const userLoginData = props.userLoginData;
  const chatId = props.chatID;
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");
    const message = {
      prompt_text: input,
      chat_id: chatId,
    };
    setLoading(true); // Set loading state to true
    try {
      const accessToken = localStorage.getItem("quest_auth_token");
      const accessTokenType = localStorage.getItem("quest_auth_token_type");

      await axios
        .post("http://localhost:80/user/prompt", message, {
          headers: {
            Authorization: `${accessTokenType} ${accessToken}`,
          },
        })
        .then((response) => {
          //   toast.success(response.data.message);
          setLoading(false);
          if (response.data.code !== "200") {
            toast.error(response.data.message);
          } else if (response.data.code === "200") {
            // console.log("api response", response);
            props.onMessageUpdate();
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
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    sendMessage(event);
    console.log(userLoginData);
    const userMessageData = {
      createdAt: timestamp.toISOString(),
      prompt_text: prompt.trim(),
      user: {
        user_id: userLoginData.email,
        user_avatar: `https://ui-avatars.com/api/?name=${userLoginData.user_name}`,
        user_name: userLoginData.user_name,
      },
    };
    props.updateFrontEnd(userMessageData);
  };
  return (
    <div className="bg-gray-700 text-white rounded-lg text-sm m-3">
      {!loading && (
        <form onSubmit={handleSubmit} className="p-5 space-x-5 flex">
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
      )}
      {/* Loading indicator */}
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="p-5 space-x-5 flex justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              ></circle>
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"
                className="opacity-75"
              ></path>
            </svg>
            <p className="text-white">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}
