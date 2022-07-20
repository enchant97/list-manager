import { Component, useContext } from "solid-js";
import { Link } from "solid-app-router";
import { LoginContext } from "../contexts/LoginProvider";
import styles from "./Header.module.css";
import shared_styles from '../Shared.module.css';

const Header: Component = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <header class={styles.Header}>
      <h1>List Manager</h1>
      <nav class={styles.nav}>
        <Link class={shared_styles.button} href="/">Home</Link>
        {isLoggedIn() === true
          ? <> <Link class={shared_styles.button} href="/lists">Lists</Link>
            <Link class={shared_styles.button} href="/logout">Logout</Link>
          </>
          : <Link class={shared_styles.button} href="/login">Login</Link>
        }
      </nav>
    </header>
  );
};

export default Header;
