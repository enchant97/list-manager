import { createSignal, createContext, useContext, JSX, createEffect } from "solid-js";
import { LoginDetails } from "../core/types";
import { getLoginDetails, removeLoginDetails, setLoginDetails } from "../core/clientData";

type LoginContextProps = {
  login?: LoginDetails
}
const makeLoginContext = (props: LoginContextProps) => {
  const [login, setLogin] = createSignal<LoginDetails | null>(props.login || getLoginDetails());
  createEffect(() => {
    let newDetails = login();
    if (newDetails === null) { removeLoginDetails() }
    else { setLoginDetails(newDetails) }
  });
  return [
    login,
    setLogin,
  ] as const;
}
type LoginProviderProps = {
  login?: LoginDetails
  children: JSX.Element
}
export const LoginProvider = (props: LoginProviderProps) => {
  let accessor = makeLoginContext(props);
  return (
    <LoginContext.Provider value={accessor}>
      {props.children}
    </LoginContext.Provider>
  );
}
type LoginContextType = ReturnType<typeof makeLoginContext>;
export const LoginContext = createContext<LoginContextType>();
export const useLogin = () => useContext(LoginContext)!;
