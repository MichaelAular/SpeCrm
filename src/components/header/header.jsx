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
import Grid from '@mui/material/Grid';

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
    setCurrentPage("Account")
    setCurrentTab("Details")
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} order={{ xs: 1, sm: 1 }} className="headerSide" justifyContent="center">
            <img className="headerImage" src="/images/27558_logonegatief.png" alt="Stichting SPE" height="60">
            </img>
          </Grid>
          <Grid item xs={8} md={4} order={{ xs: 3, sm: 2 }} className="headerSide">
              {dataLoaded && user && currentUser && currentUser.permissions.studentList != 'denied' && headerBtn("Studenten", 'Studenten', null)}
              {dataLoaded && user && currentUser && currentUser.permissions.analysis != 'denied' && headerBtn("Analyse", 'Analyse', null)}
              {dataLoaded && user && currentUser && currentUser.permissions.studentList == 'denied' && currentUser.parentOfChildId != null && headerBtn("Student", 'Uw kind', currentUser.parentOfChildId)}
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 2, sm: 2 }} className="headerSide" justifyContent="center">
            {profiles && user && currentUser && currentUser.permissions.studentList != 'denied' && <Searchbar
              profiles={profiles}
              setProfileID={setProfileID}
              profileID={profileID}
              setCurrentPage={setCurrentPage}
              setCurrentTab={setCurrentTab}
            />}
          </Grid>
          <Grid item xs={4} md={1} order={{ xs: 4, sm: 3 }} className="headerSide" justifyContent="flex-end">

            {user && <button
              className="headerBtn userBtn"
              onClick={showUser}
              style={{
                backgroundColor: currentPage === "Account" && "rgb(var(--white07))",
                color: currentPage === "Account" && "#C29435"
              }}>
              <UserIcon
                className="userBtn"
                color={currentPage === "Account" ? "--secundair" : "--white07"}
                size="24"
            />
            </button>}
              {user && <button
                className="headerBtn logOutBtn"
                onClick={logout}>
                <LogOutIcon
                  className="logOutBtn"
                size="22"
              />
              </button>}
          </Grid>
        </Grid>
      </div>

      { currentPage === "Student" &&
        <div className="tabHeaderContainer">
          <TabHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      }
      { currentPage === "Account" &&
        <div className="tabHeaderContainer">
          <TabUser currentTab={currentTab} setCurrentTab={setCurrentTab} currentUser={currentUser} />
        </div>
      }
    </>
  );
}