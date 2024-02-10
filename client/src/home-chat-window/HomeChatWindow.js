import React from "react";
export default function HomeChatWindow() {
  return (
    <div className="text-white flex flex-col items-center justify-center h-screen px-2 ">
      <h1 className="text-5xl text-center font-bold mb-20">
        XYZ Corporation <br /> AI Assistant
      </h1>
      <h5 className="text-1xl font-normal mb-20 text-center">
        If you're looking to start a new conversation, click the New Chat
        button.
      </h5>
      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
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
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>

            <h2>Examples</h2>
            <div className="space-y-2">
              <p className="infoText">Explain Something to me</p>
              <p className="infoText">Explain complex AI concepts</p>
              <p className="infoText">Answer questions about AI</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* bolt icon */}
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
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>

            <h2>Capabilities</h2>
            <div className="space-y-2">
              <p className="infoText">Access to a large amount of data</p>
              <p className="infoText">Able to understand natural language</p>
              <p className="infoText">Ability to learn and adapt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
