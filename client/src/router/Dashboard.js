import { Fragment, useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Container from "../components/Container";
import Header from "../components/Dashboard/Header";

import Forbidden from "../components/Dashboard/Forbidden";
import DarkMode from "../components/DarkMode";

// page
import Home from "../page/Dashboard/Home";
// articles
import Get from "../page/Dashboard/Articles/Get";
import Detail from "../page/Dashboard/Articles/Detail";
import Add from "../page/Dashboard/Articles/Add";
import Update from "../page/Dashboard/Articles/Update";
// cateogry
import GetCategory from "../page/Dashboard/Category/Get";
import AddCategory from "../page/Dashboard/Category/Add";
import Me from "../page/Dashboard/Profile/Me";
// cookies
import { getAllCookies } from "../utils/cookie";
import { getUsersRequest } from "../utils/action";

function Dashboard() {
  const cookie = getAllCookies();

  let location = useLocation();
  const [users, setUsers] = useState({
    user: {},
    loading: true,
    error: "",
    theme: cookie.theme,
    token: cookie.__token,
    login: cookie.isLogin,
  });

  // get api
  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await getUsersRequest();
        setUsers((prev) => ({
          ...prev,
          loading: false,
          user: data.user,
        }));
      } catch (error) {
        setUsers((prev) => ({
          ...prev,
          loading: false,
          error: error.response.data,
        }));
      }
    }
    getUsers();
  }, []);

  if (!users.token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  if (users.error) {
    return (
      <DarkMode>
        <Container>
          <Forbidden message={users?.error?.message} />
        </Container>
      </DarkMode>
    );
  }

  return (
    <Fragment>
      <DarkMode>
        {/* <Header data={users.user} theme={users.theme} loading={users.loading} /> */}
        <Container
          data={users.user}
          theme={users.theme}
          loading={users.loading}
        >
          <Routes>
            {/* articles */}
            <Route path={"/"} element={<Home />} />
            <Route path={"/articles"} element={<Get />} />
            <Route path={"/articles/:id/:slug"} element={<Detail />} />
            <Route path={"/articles/update/:id/:slug"} element={<Update />} />
            <Route path={"/articles/add"} element={<Add />} />
            {/* category */}
            <Route path={"/category"} element={<GetCategory />} />
            <Route path={"/category/add"} element={<AddCategory />} />

            {/* profile */}
            {["/me", "/me/trends", "/me/session"].map((path, i) => {
              return <Route key={i} path={path} element={<Me />} />;
            })}
          </Routes>
        </Container>
      </DarkMode>
    </Fragment>
  );
}
export default Dashboard;
