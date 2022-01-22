import React, { useContext, useState } from "react";
import { getApiUrl } from "../core/clientData";
import { LoginContext } from "../contexts/LoginProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [api_url, setApiUrl] = useState(login?.api_url || getApiUrl());
  const [api_key, setApiKey] = useState(login?.api_key || '');

  const handleApiUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(event.target.value);
  }

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: validate that login is allowed
    setLogin({ api_key, api_url });
    event.preventDefault();
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="api_url">Api Url:</label>
      <input type="text" id="api_url" name="api_url" autoComplete="username" value={api_url} onChange={handleApiUrlChange} required />
      <label htmlFor="api_key">Api Key:</label>
      <input type="password" id="api_key" name="api_key" autoComplete="current-password" value={api_key} onChange={handleApiKeyChange} required />     
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
