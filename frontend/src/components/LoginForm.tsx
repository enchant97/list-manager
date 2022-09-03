import styles from "../Shared.module.css";
import { Component, createSignal } from "solid-js";

export type LoginFormProps = {
  apiUrl?: string
  apiKey?: string
  onSubmit: (apiUrl: string, apiKey: string) => void
}

const LoginForm: Component<LoginFormProps> = (props) => {
  const [apiUrl, setApiUrl] = createSignal(props.apiUrl);
  const [apiKey, setApiKey] = createSignal(props.apiKey);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let currApiUrl = apiUrl();
    let currApiKey = apiKey();
    if (currApiUrl && currApiKey) {
      props.onSubmit(currApiUrl, currApiKey);
    }
  }

  return (
    <form class={[styles.container, styles.twoCol].join(" ")} onSubmit={handleSubmit}>
      <h1 class={styles.fillBoth}>Login</h1>
      <label for="api_url">Api Url:</label>
      <input
        type="text" id="api_url" name="api_url" autocomplete="username"
        value={apiUrl() || ""}
        onInput={(e) => setApiUrl(e.currentTarget.value)}
        required
      />
      <label for="api_key">Api Key:</label>
      <input
        type="password" id="api_key" name="api_key" autocomplete="current-password"
        value={apiKey() || ""}
        onInput={(e) => setApiKey(e.currentTarget.value)}
        required
      />
      <button class={styles.fillBoth} type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
