import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import DarkMode from "./components/DarkMode";
import Add from "./components/Dashboard/Add";
import Header from "./components/Dashboard/Header";
import Detail from "./page/Dashboard/Articles/Detail";
import Get from "./page/Dashboard/Articles/Get";
import Update from "./page/Dashboard/Articles/Update";
import Home from "./page/Dashboard/Home";
import Login from "./page/Login";
import Registration from "./page/Registration";
import Auth from "./router/Auth";
import Dashboard from "./router/Dashboard";

import config from "./apis/config";

import apis from "./apis/api";
function App() {
  const theme = JSON.parse(localStorage.getItem("theme")) || false;

  if (window.location.host.split(".")[0] == "account") {
    return (
      <DarkMode theme={theme}>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/registration"} element={<Registration />} />
        </Routes>
      </DarkMode>
    );
  } else {
    return (
      <Routes>
        <Route path={"/auth/*"} element={<Auth />} />
        <Route path={"/dashboard/*"} element={<Dashboard />} />
      </Routes>
    );
  }
}

export default App;
