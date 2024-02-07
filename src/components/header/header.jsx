import "./header.scss";
import React, { useState } from "react";
import { Modal } from "../modal/modal";
import { Save } from "../save/save";
import { SaveIcon } from "@/assets/icons/save";
import { Searchbar } from "../searchbar/searchbar";
import { TabHeader } from "../tabMenu/tabHeader";
import { TabUser } from "../tabMenu/tabUser";
import { UserIcon } from "@/assets/icons/user";
import { LogOutIcon } from "@/assets/icons/logOut";

import { useWindowSize } from "@/hooks/windowSize";

export function Header({
    currentPage,
    currentTab,
    profiles,
    setCurrentPage,
    setCurrentTab,
    setProfileID,
    profileID
  }) {
  const [saveBtnHovered, setSaveBtnHovered] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [userBtnHovered, setUserBtnHovered] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [logOutBtnHovered, setLogOutBtnHovered] = useState(false);
  const size = useWindowSize();
  const updateProfile = () => {setSaveModal(true)};
  const showUser = () => {setUserModal(true)};

  const headerBtn =( title )=> {
    return (
      <button
        className="headerBtn"
        onClick={()=>{setCurrentPage(title)}}
        style={{
          backgroundColor: title === currentPage && "rgb(var(--white07))",
          color: title === currentPage && "rgb(var(--secundair))",
          fontWeight: title === currentPage && 600
        }}
      >
        {title}
      </button>
    )
  }

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="headerSide" style={{order:size.width <= 700 ? 2 : 1}}>
          {headerBtn( "Studenten" )}
          {headerBtn( "Analyse" )}
        </div>

        <div className="headerSide" style={{order:size.width <= 700 ? 1 : 2}}>
          {profiles && <Searchbar
            profiles={profiles}
            setProfileID={setProfileID}
            profileID={profileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
          />}
          {currentPage === "Analyse" && (
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

            <button
              className="headerBtn logOutBtn"
              onClick={showUser}
              onMouseEnter={() => {setLogOutBtnHovered(true)}}
              onMouseLeave={() => {setLogOutBtnHovered(false)}}
            >
              <LogOutIcon
                className="logOutBtn"
                color={logOutBtnHovered=== true ?  "rgb(var(--secundair))" : "rgb(var(--white07))"}
               size="22"
             />
            </button>

          </div>
      </div>

      { currentPage === "Analyse" &&
      <div className="tabHeaderContainer">
        <TabHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      }
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
  );
}
