import React, { useState } from "react";
import "./searchbar.scss";
import { AutoComplete } from "../autocomplete/autocomplete";
import { Search } from "@/assets/icons/search";

export function Searchbar({
  profiles,
  setProfileID,
  profileID
}) {
  const [hovered, setHovered] = useState(false);
  let options = [];
  let input = `${profiles.list[0].firstName} ${profiles.list[0].lastName}`

  for (let i = 0; i < profiles.list.length; i++) {
    options.push({label: `${profiles.list[i].firstName} ${profiles.list[i].lastName}`, id: `${profiles.list[i].id}`})
  }

  return (
    <div className="searchbarContainer">
      <button
        className="searchBtn headerBtn"
        onMouseEnter={() => {setHovered(true)}}
        onMouseLeave={() => {setHovered(false)}}
      >
        <Search
          size="18"
          color={hovered ? "rgb(var(--secundair))" : "rgb(var(--white07))"}
        />
      </button>
        <AutoComplete
          options={options.map((option) => option.label)}
          input={input}
          fullOptions={options}
          setProfileID={setProfileID}
          profileID={profileID}
        />
    </div>
  );
}
