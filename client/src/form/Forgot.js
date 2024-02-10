/* eslint-disable default-case */
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Forgot(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  //   submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (email === "" && password === "") return;
    const forgotForm = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    setEmail("");
    setPassword("");
    // call api login
    await axios
      .post("http://localhost:80/forgot", forgotForm)
      .then((response) => {
        if (response.data.code !== "200") {
          toast.error(response.data.message);
        } else if (response.data.code === "200") {
          toast.success(response.data.message);
          // move to sign in page
          navigate("/?login");
          // reload page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.success("Something went wrong!");
        }
      })
      .catch((error) => {
        // add error notif

        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Forgot your password ?
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Now update your password account!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              email === "" ? "border-red-500" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              password === "" ? "border-red-500" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className={`py-3 w-64 text-xl text-white bg-sky-400 rounded-2xl hover:bg-sky-300 active:bg-sky-500 outline-none ${
              email.trim() === "" || password.trim() === ""
                ? "cursor-not-allowed bg-gray-400"
                : ""
            }`}
            disabled={email.trim() === "" || password.trim() === ""}
          >
            Update Password
          </button>
          <p className="mt-4 text-sm">
            Already have an account?&nbsp;&nbsp;
            <Link
              to="/?login"
              onClick={() => {
                props.setPage("login");
              }}
            >
              <span className="underline cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
}
