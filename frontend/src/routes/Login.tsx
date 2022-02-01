import React, { useCallback, useContext, useState } from "react";
import { getApiUrl } from "../core/clientData";
import { LoginContext } from "../contexts/LoginProvider";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Core.module.css";
import { getVersion } from "../core/api";
import { LoginDetails } from "../core/types";
import { BadAuthorisationError, NotFoundError } from "../core/exceptions";
import { isCompatibleWithApi } from "../core/helpers";
import Loading from "../components/Loading";

function Login() {
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [api_url, setApiUrl] = useState(login?.api_url || getApiUrl());
  const [api_key, setApiKey] = useState(login?.api_key || '');
  const [loading, setLoading] = useState(false);

  const handleApiUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(event.target.value);
  }

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    let new_login = { api_key, api_url };
    validateDetails(new_login);
    event.preventDefault();
  }

  const validateDetails = useCallback(async (new_login: LoginDetails) => {
    setLoading(true);
    try {
      let api_version = await getVersion(new_login);
      if (isCompatibleWithApi(api_version)) {
        setLogin(new_login);
        navigate('/');
      }
      else { alert("Current frontend version not compatible with selected api server!") }
    } catch (err) {
      if (err instanceof NotFoundError) { alert("API responded with 404, is the API url valid?") }
      else if (err instanceof BadAuthorisationError) { alert("Authorisation could not be validated") }
      else { throw err; }
    } finally {
      setLoading(false);
    }
  }, [setLogin, navigate, setLoading]);

  if (loading) return <Loading />;

  return (
    <form className={[styles.container, styles.twoCol].join(" ")} onSubmit={handleSubmit}>
      <h1 className={styles.fillBoth}>Login</h1>
      <label htmlFor="api_url">Api Url:</label>
      <input type="text" id="api_url" name="api_url" autoComplete="username" value={api_url} onChange={handleApiUrlChange} required />
      <label htmlFor="api_key">Api Key:</label>
      <input type="password" id="api_key" name="api_key" autoComplete="current-password" value={api_key} onChange={handleApiKeyChange} required />
      <button className={styles.fillBoth} type="submit">Login</button>
    </form>
  );
}

export default Login;
