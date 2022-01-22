import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";

function Logout() {
  const { setLogin } = useContext(LoginContext);
  setLogin(null);
  return <Navigate to="/" />
}

export default Logout
