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
    setCurrentAccount,
    setCurrentPage,
    setCurrentTab,
    setProfileID,
    currentUser
  }) {
  const user = useUser();
  const size = useWindowSize();
  const showUser = () => {
    setCurrentPage("User")
    setCurrentTab("NAW")
    setProfileID(null)
  };

  const headerBtn =( title, label, profileID )=> {
    return (
      <button
        className="headerBtn prevent-select"
        onClick={()=>{
          setCurrentPage(title)
          setCurrentTab("Profielschets")
          setProfileID(profileID)
        }}
        style={{
          backgroundColor: title === currentPage && "rgb(var(--white07))",
          color: title === currentPage && "rgb(var(--secundair))",
          fontWeight: title === currentPage && 600,
          paddingLeft: (title === "Studenten" || title === "Analyse") && "16px",
          paddingRight: (title === "Studenten" || title === "Analyse") && "16px",
        }}
      >
        {label}
      </button>
    )
  }

  const logout = () => {
    signOut()
    setCurrentPage('')
    setCurrentTab(null)
    setProfileID(null)
    setCurrentAccount(null)
  }

  return (
    <>
      <div className="header">
        <img className="headerImage" src="/images/27558_logonegatief.png" alt="Stichting SPE" height="50">
        </img>
        <div className="headerSide" style={{order:size.width <= 700 ? 2 : 1}}>
          {dataLoaded && user && currentUser && currentUser.permissions.studentList != 'denied' && headerBtn("Studenten", 'Studenten', null)}
          {dataLoaded && user && currentUser && currentUser.permissions.studentList != 'denied' && headerBtn("Analyse", 'Analyse', null)}
          {dataLoaded && user && currentUser && currentUser.permissions.studentList == 'denied' && headerBtn("Student", 'Uw kind', currentUser.parentOfChildId)}
        </div>

        <div className="headerSide" style={{
          order:size.width <= 700 ? 1 : 2,
          paddingTop:size.width <= 700 && "14px"
        }}
          >
          {profiles && user && currentUser && currentUser.permissions.studentList != 'denied' && <Searchbar
            profiles={profiles}
            setProfileID={setProfileID}
            profileID={profileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
          />}
          {profiles && user && <button
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
          </button>}

          {user && <button
            className="headerBtn userBtn"
            onClick={showUser}
            style={{
              backgroundColor: currentPage === "User" && "rgb(var(--white07))",
              color: currentPage === "User" && "#C29435"
            }}>
            <UserIcon
              className="userBtn"
              size="24"
           />
          </button>}
          {user && <button
            className="headerBtn logOutBtn"
            onClick={logout}
          >
            <LogOutIcon
              className="logOutBtn"
             size="22"
           />
          </button>}

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
    </>
  );
}