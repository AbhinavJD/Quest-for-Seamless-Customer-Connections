import logo from "./logo.svg";
import "./App.css";
import Login from "./form/Login";
import Register from "./form/Register";
import Forgot from "./form/Forgot";
import Home from "./Home";
import React, { useEffect, useState } from "react";
function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState();

  useEffect(() => {
    const auth_token = localStorage.getItem("quest_auth_token");
    setToken(auth_token);
  }, []);

  const chosePage = () => {
    if (page === "login") {
      return <Login setPage={setPage} />;
    }
    if (page === "forgot") {
      return <Forgot setPage={setPage} />;
    }
    if (page === "register") {
      return <Register setPage={setPage} />;
    }
    if (page === "home") {
      return <Home setPage={setPage} />;
    }
  };
  const pages = () => {
    if (token == null) {
      return (
        <div className="min-h-screen bg-slate-600 flex justify-center items-center">
          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
            {chosePage()}
          </div>
        </div>
      );
    } else {
      return <Home />;
    }
  };
  return <React.Fragment>{pages()}</React.Fragment>;
}

export default App;
