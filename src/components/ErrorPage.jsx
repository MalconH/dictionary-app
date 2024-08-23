import { Link } from "react-router-dom";
import "./ErrorPage.css";

export function ErrorPage() {
  return (
    <div className="error">
      <h2>Oops! Something went wrong.</h2>
      <div className="flex-container">
        <p>Please </p>
        <Link className="link" to="/">
          try again
        </Link>
      </div>
    </div>
  );
}
