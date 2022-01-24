import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";

function Logout() {
  const { setLogin } = useContext(LoginContext);
  useEffect(() => { setLogin(null) });
  return (<Navigate to="/" />);
}

export default Logout
