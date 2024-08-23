import { useId, useState } from "react";
import "./Select.css";
import { ArrowDownIcon } from "./icons";

export function Select({ onSelect }) {
  const [selected, setSelected] = useState("Sans-serif");
  const [isOpen, setIsOpen] = useState(false);
  const openId = useId();

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (e) => {
    const itemClicked = e.target;
    if (itemClicked.tagName !== "LI") return;

    setSelected(itemClicked.textContent);
    onSelect(itemClicked.textContent.toLowerCase());
    setIsOpen(false);
  };

  return (
    <div className="select">
      <div
        className="select__trigger"
        onClick={handleSelectClick}
        role="tree"
        aria-expanded={isOpen}
        aria-label="Change font for text"
      >
        <label className="select__label" htmlFor={openId} aria-description="Current selected font">
          {selected}
        </label>
        <button type="button" className="select__button" id={openId}>
          <ArrowDownIcon />
        </button>
      </div>
      <div
        className={`select__menu ${isOpen ? "open" : ""}`}
        onClick={handleMenuClick}
        aria-hidden={!isOpen}
      >
        <ul role="group">
          <li className="select__option theme--sans-serif" role="treeitem">
            Sans-serif
          </li>
          <li className="select__option theme--serif" role="treeitem">
            Serif
          </li>
          <li className="select__option theme--mono" role="treeitem">
            Mono
          </li>
        </ul>
      </div>
    </div>
  );
}
