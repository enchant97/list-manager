import { useState, createContext } from "react";
import { getLoginDetails, LoginDetails, removeLoginDetails, setLoginDetails } from "../core/clientData";

export type LoginContextType = {
  login: LoginDetails | null;
  setLogin: any;
  isLoggedIn: any;
};

export const LoginContext = createContext<LoginContextType>({ login: null, setLogin: undefined, isLoggedIn: undefined });

function LoginProvider(props: any) {
  const [login, setLogin] = useState(getLoginDetails());
  const setNewLogin = (new_details: LoginDetails | null) => {
    if (new_details === null) {
      removeLoginDetails();
    }
    else {
      setLoginDetails(new_details);
    }
    setLogin(getLoginDetails());
  }
  const isLoggedIn = () => {
    return login !== null;
  }
  return (
    <LoginContext.Provider value={{ login, setLogin: setNewLogin, isLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
