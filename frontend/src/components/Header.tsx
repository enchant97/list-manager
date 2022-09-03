import { Component, Show } from "solid-js";
import { Link } from "@solidjs/router";
import { useLogin } from "../contexts/LoginProvider";
import styles from "./Header.module.css";
import shared_styles from '../Shared.module.css';

const Header: Component = () => {
  const [login] = useLogin();

  return (
    <header class={styles.Header}>
      <h1>List Manager</h1>
      <nav class={styles.nav}>
        <Link class={shared_styles.button} href="/">Home</Link>
        <Show when={login()} fallback={<Link class={shared_styles.button} href="/login">Login</Link>}>
          <>
            <Link class={shared_styles.button} href="/lists">Lists</Link>
            <Link class={shared_styles.button} href="/logout">Logout</Link>
          </>
        </Show>
      </nav>
    </header>
  );
};

export default Header;
