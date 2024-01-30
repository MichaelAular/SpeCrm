import "./header.scss";
import React, { useState } from "react";
import { Modal } from "../modal/modal";
import { Save } from "../save/save";
import { SaveIcon } from "@/assets/icons/save";
import { Searchbar } from "../searchbar/searchbar";
import { TabHeader } from "../tabMenu/tabHeader";
import { TabUser } from "../tabMenu/tabUser";
import { UserIcon } from "@/assets/icons/user";

export function Header({ currentTab, setCurrentTab }) {
  const [saveBtnHovered, setSaveBtnHovered] = useState(false);
  const [userBtnHovered, setUserBtnHovered] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [userModal, setUserModal] = useState(false);

  const updateProfile = () => {setSaveModal(true)};
  const showUser = () => {setUserModal(true)};

  return (
    <div className="headerContainer">
      <div className="header">

        <div className="headerButtonContainer">
          <button
            className="headerBtn userBtn"
            onClick={showUser}
            onMouseEnter={() => {setUserBtnHovered(true)}}
            onMouseLeave={() => {setUserBtnHovered(false)}}
          >
          <UserIcon
            className="userBtn"
            color={userBtnHovered === true ? "--secundair" : "--white07"}
            size="22"
          />
          </button>
          {currentTab === "Profielschets" && (
              <button
                type="submit"
                className="headerBtn saveBtn"
                onClick={updateProfile}
                onMouseEnter={() => {setSaveBtnHovered(true)}}
                onMouseLeave={() => {setSaveBtnHovered(false)}}
              >
                <SaveIcon
                  className="saveBtn"
                  color={saveBtnHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white07))"}
                  size="22"
                />
              </button>
          )}
        </div>

        <TabHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Searchbar />

        <Modal
          modalOpen={saveModal}
          setModalOpen={setSaveModal}
          title="Save"
          input={<Save/>}
        />
        <Modal
          modalOpen={userModal}
          setModalOpen={setUserModal}
          title="User"
          input={"userdata"}
          // input={<TabUser/>}
        />

      </div>
    </div>
  );
}
