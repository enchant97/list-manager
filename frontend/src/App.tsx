import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "./contexts/LoginProvider";
import styles from "./styles/App.module.css";
import core_styles from "./styles/Core.module.css";

function App() {
  const {isLoggedIn} = useContext(LoginContext);

  return (
    <div className={styles.app}>
      <h1>List Manager</h1>
      <h2>Fast and minimal list management.</h2>
      {isLoggedIn() === true
        ? <Link className={core_styles.button} to="/lists">Go To Lists</Link>
        : <p>To use this app first login to an api server.</p>
      }
    </div>
  );
}

export default App;
