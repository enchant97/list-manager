import { Component, onMount } from 'solid-js';
import { useLogin } from "./contexts/LoginProvider";
import { useNavigate } from '@solidjs/router';

const App: Component = () => {
  const [login] = useLogin();
  const navigate = useNavigate();

  onMount(() => {
    if (login()) { navigate("/lists") }
    else { navigate("/login") }
  })

  return ""
};

export default App;
