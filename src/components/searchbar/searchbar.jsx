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
      {/* <em style={{ fontSize: "12px" }}>search...</em> */}
      <Search
        size="18"
        color={hovered ? "rgb(var(--secundair))" : "rgb(var(--TextOnWhite))"}
      />
      <input className="inputSearch" placeholder={`search...`} />
    </div>
  );
}
