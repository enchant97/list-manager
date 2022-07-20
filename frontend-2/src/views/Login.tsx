import { Component, createSignal, useContext, createEffect } from "solid-js";
import { getApiUrl } from "../core/clientData";
import { LoginContext } from "../contexts/LoginProvider";
import { useNavigate } from "solid-app-router";
import styles from "../Shared.module.css";
import { getVersion } from "../core/api";
import { LoginDetails } from "../core/types";
import { BadAuthorisationError, NotFoundError } from "../core/exceptions";
import { isCompatibleWithApi } from "../core/helpers";
import Loading from "../components/Loading";

const Login: Component = () => {
  const { getLogin, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [api_url, setApiUrl] = createSignal(getLogin()?.api_url || getApiUrl());
  const [api_key, setApiKey] = createSignal(getLogin()?.api_key || '');
  const [loading, setLoading] = createSignal(false);
  const [loginEntry, setLoginEntry] = createSignal<LoginDetails | null>(null);

  const validateDetails = async (new_login: LoginDetails) => {
    try {
      let api_version = await getVersion(new_login);
      if (isCompatibleWithApi(api_version)) {
        return null;
      }
      else { return "Current frontend version not compatible with selected api server!" }
    } catch (err) {
      if (err instanceof NotFoundError) { return "API responded with 404, is the API url valid?" }
      else if (err instanceof BadAuthorisationError) { return "Authorisation could not be validated" }
      else { console.error(err); return "Unknown error encountered"; }
    }
  }

  createEffect(async () => {
    const new_login = loginEntry();
    if (new_login !== null) {
      setLoading(true);
      let message = await validateDetails(new_login);

      setLoading(false);

      if (message === null) {
        setLogin(loginEntry());
        navigate('/');
        return;
      }
      alert(message);
    }
  });

  const handleApiUrlChange = (event: any) => {
    setApiUrl(event.target.value);
  }

  const handleApiKeyChange = (event: any) => {
    setApiKey(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let new_login = { api_key: api_key(), api_url: api_url() };
    setLoginEntry(new_login);
  }

  if (loading()) return <Loading />;

  return (
    <form class={[styles.container, styles.twoCol].join(" ")} onSubmit={handleSubmit}>
      <h1 class={styles.fillBoth}>Login</h1>
      <label for="api_url">Api Url:</label>
      <input type="text" id="api_url" name="api_url" autocomplete="username" value={api_url()} onInput={handleApiUrlChange} required />
      <label for="api_key">Api Key:</label>
      <input type="password" id="api_key" name="api_key" autocomplete="current-password" value={api_key()} onInput={handleApiKeyChange} required />
      <button class={styles.fillBoth} type="submit">Login</button>
    </form>
  );
};

export default Login;
