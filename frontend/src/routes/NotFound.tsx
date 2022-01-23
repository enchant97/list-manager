import { Link } from "react-router-dom";

function NotFound() {
  return (
      <div>
        <h1>404</h1>
        <p>The page you were looking for does not exist.</p>
        <Link to="/">Go Back Home</Link>
      </div>
  );
}

export default NotFound;
