import { createSignal, createContext, Accessor } from "solid-js";
import { LoginDetails } from "../core/types";
import { getLoginDetails, removeLoginDetails, setLoginDetails } from "../core/clientData";

export type LoginContextType = {
  getLogin: Accessor<LoginDetails> | null;
  setLogin: any | undefined;
  isLoggedIn: boolean;
};

export const LoginContext = createContext<LoginContextType>({ getLogin: null, setLogin: undefined, isLoggedIn: false });

function LoginProvider(props: any) {
  const [getLogin, setLogin] = createSignal(getLoginDetails());
  const setNewLogin = (new_details: LoginDetails | null) => {
    if (new_details === null) {
      removeLoginDetails();
    }
    else {
      setLoginDetails(new_details);
    }
    setLogin(getLoginDetails());
  }
  return (
    <LoginContext.Provider value={{ getLogin, setLogin: setNewLogin, isLoggedIn: getLogin() !== null }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
