import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";

function Header() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header>
      <h1>List Manager</h1>
      <nav>
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
