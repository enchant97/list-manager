import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import styles from  "../styles/Header.module.css"

function Header() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header className={styles['header']}>
      <h1>List Manager</h1>
      <nav className={styles['nav']}>
        <Link to="/">Home</Link>
        {isLoggedIn() !== false
          ? <> <Link to="/lists">Lists</Link>
            <Link to="/logout">Logout</Link>
          </>
          : <Link to="/login">Login</Link>
        }
      </nav>
    </header>
  );
}

export default Header;
