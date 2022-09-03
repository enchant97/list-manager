import { Component, createSignal, createEffect, Show } from "solid-js";
import { getApiUrl } from "../core/clientData";
import { useLogin } from "../contexts/LoginProvider";
import { useNavigate } from "@solidjs/router";
import { getVersion } from "../core/api";
import { LoginDetails } from "../core/types";
import { BadAuthorisationError, NotFoundError } from "../core/exceptions";
import { isCompatibleWithApi } from "../core/helpers";
import Loading from "../components/Loading";
import LoginForm from "../components/LoginForm";

const Login: Component = () => {
  const [login, setLogin] = useLogin();
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = createSignal(login()?.api_url || getApiUrl());
  const [apiKey, setApiKey] = createSignal(login()?.api_key || undefined);
  const [getLoading, setLoading] = createSignal(false);

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
    let currApiUrl = apiUrl();
    let currApiKey = apiKey();

    if (currApiUrl && currApiKey) {
      setLoading(true);
      let loginDetails: LoginDetails = { api_url: currApiUrl, api_key: currApiKey }
      let message = await validateDetails(loginDetails);

      setLoading(false);

      if (message === null) {
        setLogin(loginDetails);
        navigate('/');
        return;
      }
      alert(message);
    }
  });

  const handleSubmit = (apiUrl: string, apiKey: string) => {
    setApiUrl(apiUrl);
    setApiKey(apiKey);
  };

  return (
    <Show when={!getLoading()} fallback={<Loading />}>
      <LoginForm apiUrl={apiUrl()} apiKey={apiKey()} onSubmit={handleSubmit} />
    </Show>
  );
};

export default Login;
