import { Component, createSignal, onMount } from "solid-js";

export type LoginFormProps = {
  apiUrl?: string
  apiKey?: string
  onSubmit: (apiUrl: string, apiKey: string) => void
}

const LoginForm: Component<LoginFormProps> = (props) => {
  let defaultFocus: HTMLInputElement | undefined;
  const [apiUrl, setApiUrl] = createSignal(props.apiUrl);
  const [apiKey, setApiKey] = createSignal(props.apiKey);

  onMount(() => defaultFocus?.focus())

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let currApiUrl = apiUrl();
    let currApiKey = apiKey();
    if (currApiUrl && currApiKey) {
      props.onSubmit(currApiUrl, currApiKey);
    }
  }

  return (
    <form class="hero min-h-screen bg-base-200" onSubmit={handleSubmit}>
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login</h1>
          <p class="py-6 text-lg">
            List Manager the fast and minimal list management app.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label" for="api_url">Api Url:</label>
              <input
                class="input input-bordered"
                type="text" id="api_url" name="api_url" autocomplete="username"
                value={apiUrl() || ""}
                onInput={(e) => setApiUrl(e.currentTarget.value)}
                required
              />
            </div>
            <div class="form-control">
              <label class="label" for="api_key">Api Key:</label>
              <input
                ref={defaultFocus}
                class="input input-bordered"
                type="password" id="api_key" name="api_key" autocomplete="current-password"
                value={apiKey() || ""}
                onInput={(e) => setApiKey(e.currentTarget.value)}
                required
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" type="submit">Login</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
