import "./header.scss";
import React, { useState, useEffect } from "react";
import { LogOutIcon } from "@/assets/icons/logOut";
import { Modal } from "../modal/modal";
import { Save } from "../save/save";
import { SaveIcon } from "@/assets/icons/save";
import { Searchbar } from "../searchbar/searchbar";
import { TabHeader } from "../tabMenu/tabHeader";
import { TabUser } from "../tabMenu/tabUser";
import { UserIcon } from "@/assets/icons/user";
import { useWindowSize } from "@/hooks/windowSize";

export function Header({
    currentPage,
    currentTab,
    dataLoaded,
    formJson,
    profileID,
    profiles,
    setCurrentPage,
    setCurrentTab,
    setProfileID,
  }) {
    useEffect(()=> {
      console.log("formJson in header:", formJson)
    },[formJson])
  const [saveBtnHovered, setSaveBtnHovered] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [userBtnHovered, setUserBtnHovered] = useState(false);
  const [logOutBtnHovered, setLogOutBtnHovered] = useState(false);
  const size = useWindowSize();
  const updateProfile = () => {setSaveModal(true)};
  const showUser = () => {
    setCurrentPage("User")
    setCurrentTab("NAW")
    setProfileID(null)
  };

  const headerBtn =( title )=> {
    return (
      <button
        className="headerBtn prevent-select"
        onClick={()=>{
          setCurrentPage(title)
          setCurrentTab("Profielschets")
          setProfileID(null)
        }}
        style={{
          backgroundColor: title === currentPage && "rgb(var(--white07))",
          color: title === currentPage && "rgb(var(--secundair))",
          fontWeight: title === currentPage && 600,
          paddingLeft: (title === "Studenten" || title === "Analyse") && "16px",
          paddingRight: (title === "Studenten" || title === "Analyse") && "16px",
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
          {dataLoaded && headerBtn( "Studenten" )}
          {dataLoaded && headerBtn( "Analyse" )}
        </div>

        <div className="headerSide" style={{
          order:size.width <= 700 ? 1 : 2,
          paddingTop:size.width <= 700 && "14px"
        }}
          >
          {profiles && <Searchbar
            profiles={profiles}
            setProfileID={setProfileID}
            profileID={profileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
          />}
          <button
            type="submit"
            className="headerBtn saveBtn"
            onClick={updateProfile}
            onMouseEnter={() => {currentPage === "Student" && setSaveBtnHovered(true)}}
            onMouseLeave={() => {currentPage === "Student" && setSaveBtnHovered(false)}}
            style={{
              pointerEvents: currentPage !== "Student" && "none",
              opacity: currentPage !== "Student" && .2,
            }}
          >
            <SaveIcon
              className="saveBtn"
              color={saveBtnHovered === true ? "rgb(var(--secundair))" : "rgb(var(--white07))"}
              size="24"
            />
          </button>

          <button
            className="headerBtn userBtn"
            onClick={showUser}
            onMouseEnter={() => {setUserBtnHovered(true)}}
            onMouseLeave={() => {setUserBtnHovered(false)}}
            style={{ backgroundColor: currentPage === "User" && "rgb(var(--white07))" }}
          >
            <UserIcon
              className="userBtn"
              color={
                userBtnHovered === true || currentPage === "User" ? "--secundair" : "--white07"}
              size="24"
           />
          </button>
          <button
            className="headerBtn logOutBtn"
            onClick={()=>{console.log("Log Out")}}
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

      { currentPage === "Student" &&
        <div className="tabHeaderContainer">
          <TabHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      }
      { currentPage === "User" &&
      <div className="tabHeaderContainer">
        <TabUser currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      }
      <Modal
        modalOpen={saveModal}
        setModalOpen={setSaveModal}
        title="Save"
        input={<Save setModalOpen={setSaveModal}/>}
      />
    </div>
  );
}
