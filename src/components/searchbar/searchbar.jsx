import React, { useState } from "react";
import "./searchbar.scss";
import { Search } from "@/assets/icons/search";

export function Searchbar() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="searchbarContainer"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <button className="searchBtn">
        <Search
          size="18"
          color={hovered ? "rgb(var(--secundair))" : "rgb(var(--TextOnWhite))"}
        />
      </button>
      <input className="inputSearch" placeholder={`search student...`} />
    </div>
  );
}
