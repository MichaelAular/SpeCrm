import "./header.scss";
import React from "react";
import { signOut } from "@/app/auth";
import { LogOutIcon } from "@/assets/icons/logOut";
import { SaveIcon } from "@/assets/icons/save";
import { Searchbar } from "../searchbar/searchbar";
import { TabHeader } from "../tabMenu/tabHeader";
import { TabUser } from "../tabMenu/tabUser";
import { UserIcon } from "@/assets/icons/user";
import { useWindowSize } from "@/hooks/windowSize";
import { useUser } from "@/app/auth";

export function Header({
    currentPage,
    currentTab,
    dataLoaded,
    profileID,
    profiles,
    setCurrentPage,
    setCurrentTab,
    setProfileID,
  }) {
  const user = useUser();
  const size = useWindowSize();
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
          {dataLoaded && user && headerBtn( "Studenten" )}
          {dataLoaded && user && headerBtn( "Analyse" )}
        </div>

        <div className="headerSide" style={{
          order:size.width <= 700 ? 1 : 2,
          paddingTop:size.width <= 700 && "14px"
        }}
          >
          {profiles && user && <Searchbar
            profiles={profiles}
            setProfileID={setProfileID}
            profileID={profileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
          />}
          <button
            type="submit"
            form="form"
            className="headerBtn saveBtn"
            style={{
              pointerEvents: currentPage !== "Student" && "none",
              opacity: currentPage !== "Student" && .2,
            }}
          >
            <SaveIcon
              className="saveBtn"
              size="24"
            />
          </button>

          <button
            className="headerBtn userBtn"
            onClick={showUser}
            style={{ backgroundColor: currentPage === "User" && "rgb(var(--white07))" }}
          >
            <UserIcon
              className="userBtn"
              size="24"
           />
          </button>
          <button
            className="headerBtn logOutBtn"
            onClick={()=>{signOut()}}
          >
            <LogOutIcon
              className="logOutBtn"
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
    </div>
  );
}