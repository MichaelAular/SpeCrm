import "./header.scss";
import React, { useState } from "react";
import { Modal } from "../modal/modal";
import { Save } from "../save/save";
import { SaveIcon } from "@/assets/icons/save";
import { Searchbar } from "../searchbar/searchbar";
import { TabMenu } from "../tabMenu/tabMenu";

export function Header({ currentTab, setCurrentTab }) {
  const [saveBtnHovered, setSaveBtnHovered] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const updateProfile = () => {setSaveModal(true)};

  return (
    <div className="headerContainer">
      <div className="header">
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Searchbar />
        {currentTab === "Profielschets" && (
          <>
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
            <SaveIcon
              className="saveBtn"
              color={
                saveBtnHovered === true
                  ? "rgb(var(--secundair))"
                  : "rgb(var(--white07)"
              }
              size="22"
            />
          </button>
          <Modal modalOpen={saveModal} setModalOpen={setSaveModal} title="Save" input={<Save/>}/>
          </>
        )}
      </div>
    </div>
  );
}
