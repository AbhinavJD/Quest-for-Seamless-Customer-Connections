/* eslint-disable default-case */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register(props) {
  const navigate = useNavigate();
  // Register Form
  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    employee_id: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    employee_id: "",
    password: "",
  });
  // form on change handler
  const onChangeForm = (label, event) => {
    let value = event.target.value;
    let isValid = true;
    let errorMessage = "";

    switch (label) {
      case "username":
        isValid = value.trim() !== "";
        errorMessage = isValid ? "" : "Username is mandatory";
        break;
      case "email":
        const emailValidation = /\S+@\S+\.\S+/;
        isValid = emailValidation.test(value) || value === "";
        errorMessage = isValid ? "" : "Invalid email format";
        break;
      case "employee_id":
        isValid = value.trim() !== "" && !isNaN(value);
        errorMessage = isValid
          ? ""
          : "Employee ID is mandatory and must be a number";
        break;
      case "password":
        isValid = value.trim() !== "";
        errorMessage = isValid ? "" : "Password is mandatory";
        break;
    }

    setValidationErrors({ ...validationErrors, [label]: errorMessage });
    setFormRegister({ ...formRegister, [label]: value });

    // Check if there are no validation errors
    const isValidForm = Object.values(formRegister).every(
      (value) => value !== ""
    );
    setIsFormValid(isValidForm);
  };
  //   Submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formRegister);
    // Validate one more time before submitting (optional)
    if (!isFormValid) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    // call api login
    await axios
      .post("http://localhost:80/create", formRegister)
      .then((response) => {
        console.log(response);
        // add successfully notif
        toast.success(response.data.message);

        // Reset the form after a successful submission
        setFormRegister({
          username: "",
          email: "",
          employee_id: "",
          password: "",
        });

        // Clear validation errors
        setValidationErrors({
          username: "",
          email: "",
          employee_id: "",
          password: "",
        });

        // move to sign in page
        navigate("/?login");
        // reload page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
            placeholder="Username"
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              validationErrors.username ? "border-red-500" : ""
            }`}
            onChange={(event) => {
              onChangeForm("username", event);
            }}
          />
          {validationErrors.username && (
            <p className="text-red-500 text-sm">{validationErrors.username}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              validationErrors.email ? "border-red-500" : ""
            }`}
            onChange={(event) => {
              onChangeForm("email", event);
            }}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm">{validationErrors.email}</p>
          )}
          <input
            type="number"
            placeholder="Employee ID"
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              validationErrors.employee_id ? "border-red-500" : ""
            }`}
            onChange={(event) => {
              onChangeForm("employee_id", event);
            }}
          />
          {validationErrors.employee_id && (
            <p className="text-red-500 text-sm">
              {validationErrors.employee_id}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-400 ${
              validationErrors.password ? "border-red-500" : ""
            }`}
            onChange={(event) => {
              onChangeForm("password", event);
            }}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm">{validationErrors.password}</p>
          )}
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className={`py-3 w-64 text-xl text-white rounded-2xl outline-none ${
              isFormValid
                ? "bg-sky-400 hover:bg-sky-300 active:bg-sky-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
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
