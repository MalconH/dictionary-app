import { useLoaderData } from "react-router-dom";
import "./WordError.css";

export function WordError() {
  const { word } = useLoaderData();

  return (
    <div className="error">
      <p className="sad-face">:/</p>
      <h2>
        Oops! We couldn't find <span>"{word}"</span>.
      </h2>
      <p>Please check you spelled it correctly or try searching something else!</p>
    </div>
  );
}
