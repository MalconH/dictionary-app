import { useEffect, useRef, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { SearchIcon } from "./icons";
import { Select } from "./Select";
import { Switch } from "./Switch";

export default function Header() {
  const currentFontFamily = useRef("sans-serif");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Obtain the word in the Location and store it in a ref
  const wordInLocation = location.pathname.split("/").at(-1).replace(/%20/gi, " ");

  const handleChangeFont = (value) => {
    const newFontFamily = value;
    const themes = ["sans-serif", "serif", "mono"];
    document.body.classList.remove(...themes.map((theme) => `theme--${theme}`));
    document.body.classList.add(`theme--${newFontFamily}`);
    currentFontFamily.current = newFontFamily;
  };
  const handleChangeTheme = (isToggled) => {
    console.log(isToggled);
    document.body.classList.remove("dark");

    if (isToggled) document.body.classList.add("dark");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === wordInLocation) return;
    if (query.trim() === "") return;

    navigate(`/word/${query.trim()}`);
  };

  // Sync the search field when the location changes
  useEffect(() => {
    setQuery(wordInLocation);
  }, [wordInLocation]);

  return (
    <header className="header">
      <div className="header__options">
        <Link to="/">
          <img src="logo.svg" alt="Dictionary app Logo" />
        </Link>
        <div className="options">
          <div className="options__font">
            <Select onSelect={handleChangeFont} />
          </div>
          <hr className="separator" />
          <div className="options__darkmode">
            <Switch onChange={handleChangeTheme} />
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit} className="header__search">
        <div className="searchbar">
          <input
            type="search"
            name="queryWord"
            placeholder="Search for any word..."
            aria-label="Word to search"
            onInput={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" aria-label="Search button">
            <SearchIcon />
          </button>
        </div>
      </Form>
    </header>
  );
}
