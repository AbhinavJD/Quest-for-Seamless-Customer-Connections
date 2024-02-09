import React from "react";
const handleLogout = () => {
  // Remove user data from local storage
  localStorage.removeItem("quest_auth_token");
  localStorage.removeItem("quest_auth_token_type");

  // Refresh the browser
  window.location.reload();

  // Redirect to the login page
  window.location.href = "/login"; // Update the path to your login page
};
const LogoutButton = () => {
  return (
    <div className="p-4 flex text-gray-700 hover:text-red-700 text-white font-bold  rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 flex-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
        />
      </svg>
      <button onClick={handleLogout} className="flex-1">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
