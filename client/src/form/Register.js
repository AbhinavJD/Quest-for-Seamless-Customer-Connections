/* eslint-disable default-case */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { USERS_URL } from "../constants";

export default function Register(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  //   Submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (email === "" && password === "" && userName === "" && employeeId === "")
      return;
    const formRegister = {
      user_name: userName.toLowerCase(),
      email: email.toLowerCase(),
      employee_id: employeeId,
      password: password,
    };

    // call api login
    await axios
      .post(USERS_URL + "/create", formRegister)
      .then((response) => {
        if (response.data.code == "200") {
          console.log(response);
          // add successfully notif
          toast.success(response.data.message);
          // move to sign in page
          navigate("/login"); // Reset the form after a successful submission
          setUserName("");
          setEmail("");
          setEmployeeId("");
          setPassword("");

          // reload page
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error("User Already Exists!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("User Already Exists!");
      });
  };
  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Create An Account
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Welcome to XYZ Corp.!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              userName === "" ? "border-red-500" : ""
            }`}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userName === "" && (
            <p className="text-red-500 text-sm">User Name is mandatory!</p>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              email === "" ? "border-red-500" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email === "" && (
            <p className="text-red-500 text-sm">Email is mandatory!</p>
          )}
          <input
            type="number"
            placeholder="Employee ID"
            value={employeeId}
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              employeeId === "" ? "border-red-500" : ""
            }`}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          {employeeId === "" && (
            <p className="text-red-500 text-sm">Employee ID is mandatory!</p>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              password === "" ? "border-red-500" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password === "" && (
            <p className="text-red-500 text-sm">Password is mandatory!</p>
          )}
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className={`py-3 w-64 text-xl text-white rounded-2xl outline-none ${
              email.trim() === "" ||
              userName.trim() === "" ||
              employeeId.trim() === "" ||
              password.trim() === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-400 hover:bg-sky-300 active:bg-sky-500"
            }`}
            disabled={
              email.trim() === "" ||
              userName.trim() === "" ||
              employeeId.trim() === "" ||
              password.trim() === ""
            }
          >
            Create Account
          </button>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
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
