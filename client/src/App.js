import React from "react";
// router
import { Routes, Route } from "react-router-dom";
import AddArticles from "./page/backend/Articles/AddArticles";
import Draft from "./page/backend/Articles/Draft";
import GetArticles from "./page/backend/Articles/GetArticles";
// components
import Home from "./page/backend/Home";
import Login from "./page/backend/Account/Login";
import Registration from "./page/backend/Account/Registration";
import Detail from "./page/backend/Articles/Detail";
import GetCategory from "./page/backend/Category/GetCategory";
import UpdateArticles from "./page/backend/Articles/UpdateArticles";

export default function App() {
  const host = window.location.host.split(".")[0];

  if (host === "account") {
    return (
      <Routes>
        <Route element={<Login />} path="/" index />
        <Route element={<Registration />} path="/registration" />
      </Routes>
    );
  }

  if (host === "dashboard") {
    return (
      <Routes>
        <Route element={<Home />} path="/" index />
        {/* articlles */}
        <Route element={<GetArticles />} path="/articles" />
        <Route element={<Draft />} path="/articles/draft" />
        <Route element={<AddArticles />} path="/articles/add" />
        <Route element={<Detail />} path="/articles/:id/:slug" />
        <Route element={<UpdateArticles />} path="/articles/update/:id" />

        {/* category */}
        <Route element={<GetCategory />} path="/category" />
      </Routes>
    );
  }
}
