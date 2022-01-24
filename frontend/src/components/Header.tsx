import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import styles from  "../styles/Header.module.css";
import coreStyles from "../styles/Core.module.css";

function Header() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header className={styles['header']}>
      <h1>List Manager</h1>
      <nav className={styles['nav']}>
        <Link className={coreStyles.button} to="/">Home</Link>
        {isLoggedIn() === true
          ? <> <Link className={coreStyles.button} to="/lists">Lists</Link>
            <Link className={coreStyles.button} to="/logout">Logout</Link>
          </>
          : <Link className={coreStyles.button} to="/login">Login</Link>
        }
      </nav>
    </header>
  );
}

export default Header;
