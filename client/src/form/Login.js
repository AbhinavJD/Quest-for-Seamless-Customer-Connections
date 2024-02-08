/* eslint-disable default-case */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login(props) {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const onChangeForm = (label, event) => {
    const value = event.target.value;

    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [label]: value,
    }));

    // Use the updated state directly
    setIsFormValid((prevIsValid) => {
      const updatedIsValidForm =
        (label === "username" ? value !== "" : loginForm.username !== "") &&
        (label === "password" ? value !== "" : loginForm.password !== "");

      return updatedIsValidForm;
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // call api login
    const form_data = new FormData();
    form_data.append("username", loginForm.username);
    form_data.append("password", loginForm.password);
    await axios
      .post("http://localhost:80/login", form_data)
      .then((response) => {
        if (response.data.code !== "200") {
          toast.error(response.data.message);
        } else if (response.data.code === "200") {
          toast.success(response.data.message);
          // saving token to local storage
          localStorage.setItem(
            "quest_auth_token",
            response.data["access_token"]
          );
          localStorage.setItem(
            "quest_auth_token_type",
            response.data["token_type"]
          );

          // move to sign in page
          navigate("/home");
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
          Welcome to XYZ Corp.
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Please login to your account!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400"
            onChange={(event) => {
              onChangeForm("username", event);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400"
            onChange={(event) => {
              onChangeForm("password", event);
            }}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className={`py-3 w-64 text-xl text-white bg-sky-400 rounded-2xl hover:bg-sky-300 active:bg-sky-500 outline-none ${
              isFormValid ? "" : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={!isFormValid}
          >
            Sign In
          </button>
          <p className="mt-4 text-sm">
            You don't have an account?&nbsp;&nbsp;
            <Link
              to="/?register"
              onClick={() => {
                props.setPage("register");
              }}
            >
              <span className="underline cursor-pointer">Register</span>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link
              to="/?forgot"
              onClick={() => {
                props.setPage("forgot");
              }}
            >
              <span className="underline cursor-pointer">Forgot Password?</span>
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
}
