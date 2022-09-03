import { createEffect, Component } from "solid-js";
import { Navigate } from "@solidjs/router";
import { useLogin } from "../contexts/LoginProvider";

const Logout: Component = () => {
  const [_login, setLogin] = useLogin();
  createEffect(() => { setLogin(null) });
  return (<Navigate href="/" />);
};

export default Logout;
