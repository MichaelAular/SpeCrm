import "./header.scss";
import React, { useState } from "react";
import { Save } from "@/assets/icons/save";
import { Searchbar } from "../searchbar/searchbar";
import { TabMenu } from "../tabMenu/tabMenu";

export function Header({ currentTab, setCurrentTab }) {
  const [saveBtnHovered, setSaveBtnHovered] = useState(false);
  const updateProfile = () => {
    console.log("[currentProfile:]", );
  };

  return (
    <div className="headerContainer">
      <div className="header">
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Searchbar />
        {currentTab === "Profielschets" && (
          <button
            type="submit"
            className="saveBtn"
            onClick={updateProfile}
            onMouseEnter={() => {
              setSaveBtnHovered(true);
            }}
            onMouseLeave={() => {
              setSaveBtnHovered(false);
            }}
          >
            <Save
              className="saveBtn"
              color={
                saveBtnHovered === true
                  ? "rgb(var(--secundair))"
                  : "rgb(var(--white07)"
              }
              size="22"
            />
          </button>
        )}
      </div>
    </div>
  );
}
