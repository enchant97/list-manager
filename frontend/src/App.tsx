import { Component } from 'solid-js';
import { useLogin } from "./contexts/LoginProvider";
import styles from './App.module.css';
import { Link } from '@solidjs/router';
import shared_styles from './Shared.module.css';

const App: Component = () => {
  const [login] = useLogin();

  return (
    <div class={styles.App}>
      <h1>List Manager</h1>
      <h2>Fast and minimal list management.</h2>
      {login()
        ? <Link class={shared_styles.button} href="/lists">Go To Lists</Link>
        : <p>To use this app first login to an api server.</p>
      }
    </div>
  );
};

export default App;
