import React from "react";

export default function AsideUsername(props) {
  const userdata = props.userdata;
  return (
    <div className="flex items-center pl-6 h-20 border-b border-gray-800">
      <img
        src=""
        alt=""
        className="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500"
      />
      <div className="ml-1">
        <p className="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">
          {userdata?.user_name}
        </p>
        <div className="badge">
          <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">
            ID: {userdata?.employee_id}
          </span>
        </div>
      </div>
    </div>
  );
}
