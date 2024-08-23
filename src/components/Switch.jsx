import { MoonIcon } from "./icons";
import "./Switch.css";

export function Switch({ onChange }) {
  return (
    <div>
      <label className="switch-container" htmlFor="switch">
        <MoonIcon />
        <div className="switch">
          <input id="switch" type="checkbox" onChange={(e) => onChange(e.target.checked)} />
          <span className="slider round"></span>
        </div>
      </label>
    </div>
  );
}
