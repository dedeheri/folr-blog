import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Container from "../components/Container";
import DarkMode from "../components/DarkMode";
import Login from "../page/Login";
import Registration from "../page/Registration";
import { getUsers } from "../utils/action";

function Auth() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers(setLoading, setUser, setError);
  }, []);

  const theme = JSON.parse(localStorage.getItem("theme") || false);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  if (user) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    );
  } else {
    return (
      <DarkMode theme={theme}>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/registration"} element={<Registration />} />
        </Routes>
      </DarkMode>
    );
  }
}

export default Auth;
