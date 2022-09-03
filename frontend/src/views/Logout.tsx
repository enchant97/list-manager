import { useContext, createEffect, Component } from "solid-js";
import { Navigate } from "@solidjs/router";
import { LoginContext } from "../contexts/LoginProvider";

const Logout: Component = () => {
  const { setLogin } = useContext(LoginContext);
  createEffect(() => { setLogin(null) });
  return (<Navigate href="/" />);
};

export default Logout;
