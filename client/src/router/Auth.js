import { Route, Routes } from "react-router-dom";
import DarkMode from "../components/DarkMode";
import NavbarAuth from "../components/Dashboard/NavbarAuth";
import Login from "../page/Login";
import Registration from "../page/Registration";

function Auth() {
  return (
    <DarkMode>
      <NavbarAuth />
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/registration"} element={<Registration />} />
      </Routes>
    </DarkMode>
  );
}

export default Auth;
