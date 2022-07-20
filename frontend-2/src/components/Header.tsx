import { Component, useContext } from "solid-js";
import { Link } from "solid-app-router";
import { LoginContext } from "../contexts/LoginProvider";
import styles from "./Header.module.css";

const Header: Component = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <header class={styles.Header}>
      <h1>List Manager</h1>
      <nav class={styles.nav}>
        <Link href="/">Home</Link>
        {isLoggedIn() === true
          ? <> <Link href="/lists">Lists</Link>
            <Link href="/logout">Logout</Link>
          </>
          : <Link href="/login">Login</Link>
        }
      </nav>
    </header>
  );
};

export default Header;
