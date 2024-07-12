"use client";
import "./page";
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from "../services/firebaseProfiles";
import * as FirestoreUserService from "../services/firebaseUsers";
import { useUser, getAccount } from "@/app/auth";
import { Header } from "@/components/header/header";
import { Page_Login } from "@/pagesAndTabs/login";
import { Page_User } from "@/pagesAndTabs/user";
import { Page_Students } from "@/pagesAndTabs/students";
import { Page_Analyse } from "@/pagesAndTabs/analyse";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluaties";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";
import { Spinner } from "@/components/spinner/spinner";
import emptyProfile from '../models/profile.json';
import "./page.scss";
import { Page_UrenRegistraties } from "@/pagesAndTabs/urenRegistraties";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentTab, setCurrentTab] = useState(null);
  const [dataLoaded, setLoaded] = useState(false);
  const [profileID, setProfileID] = useState(null);
  const [profiles, setProfiles] = useState();
  const user = useUser();

  useEffect(() => {
    if (user != null && user['uid'] != "") {
      if (currentAccount == null) {
        FirestoreUserService.getUser(user['uid'])
        .then((doc) => {
            if (doc.exists) {
              const userContent = doc.data();
              setCurrentAccount(userContent);
            } else {
              console.log("Document not found");
            }
        })
        .catch(() => console.log("Error"));
      } else {
        if (currentAccount != null && currentAccount.parentOfChildId != null) {
          setProfileID(currentAccount.parentOfChildId);
          setCurrentPage("Student");
          setCurrentTab("Profielschets");
        } else {
          if (currentAccount.permissions.studentList != 'denied') {
            FirestoreProfileService.fetchProfileNameList()
              .then((doc) => {
                if (doc.exists) {
                  const onlyActiveProfiles = {
                    "list": doc.data().list.filter(function (el) {
                      return el.active == 1;
                    })
                  }
                  setProfiles(onlyActiveProfiles);
                  setCurrentPage("Studenten");
                } else {
                  console.log("Document not found");
                }
            })
            .catch(() => console.log("Error"));
          }
        }
      }
      if (profiles) {
        setCurrentPage("Studenten");
      }
      setLoaded(true);
    } else if (sessionStorage.getItem('user') == null || sessionStorage.getItem('user') == '') {
      setProfiles(null);
      setCurrentAccount(null);
      setCurrentPage("Login");
      setLoaded(true);
    }
  }, [user, currentAccount]);

  useEffect(() => {
    if (currentPage == 'Studenten') { //TODO: auth check
      FirestoreProfileService.fetchProfileNameList()
      .then((doc) => {
        if (doc.exists) {
          const onlyActiveProfiles = {
            "list": doc.data().list.filter(function (el) {
              return el.active == 1;
            })
          }
          setProfiles(onlyActiveProfiles);
          //setLoaded(true);
        } else {
          console.log("Document not found");
        }
      })
      .catch(() => console.log("Error"));
    }

  }, []);

  useEffect(() => {
    const resetProfile = JSON.parse(JSON.stringify(emptyProfile));
    resetProfile.birthDate = new Date();
    setCurrentProfile(resetProfile);
    if (profileID && profileID !== "new_user") {
      FirestoreProfileService.getProfile(profileID)
        .then((doc) => {
          if (doc.docChanges()[0].doc.exists) {
            const profileContent = doc.docChanges()[0].doc.data()
            profileContent.birthDate = profileContent.birthDate.toDate()
            profileContent.incidents.map((incident) => {
              incident.date = incident.date.toDate()
            })
            profileContent.attentionPoints.map((attentionPoint) => {
              attentionPoint.date = attentionPoint.date.toDate()
            })
            setCurrentProfile(profileContent);
          } else {
            console.log("Document not found");
          }
        })
        .catch(() => console.log("Error"));
    }
  }, [profileID]);

  return (
    <>
        <Header
          currentPage={currentPage}
          currentTab={currentTab}
          currentProfile={currentProfile}
          currentUser={currentAccount}
          setCurrentAccount={setCurrentAccount}
          setCurrentPage={setCurrentPage}
          setCurrentTab={setCurrentTab}
          profiles={profiles}
          setProfileID={setProfileID}
          profileID={profileID}
          dataLoaded={dataLoaded}
        />
      {dataLoaded && (<main>
        {currentPage === "Login" && (
          <Page_Login/>
        )}
        {currentPage === "Studenten" && profiles && (
          <Page_Students
            profiles={profiles}
            setProfileID={setProfileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
          />
        )}
        {currentPage === "Student" && currentTab === "Evaluatie" && (
          <Tab_Evaluatie profileID={profileID} currentProfile={currentProfile} />
        )}
        {currentPage === "Student" &&
          currentTab === "Profielschets" &&
          currentProfile !== null && (
            <Tab_Profiel
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
              dataLoaded={dataLoaded}
              profileID={profileID}
              setCurrentPage={setCurrentPage}
              setCurrentTab={setCurrentTab}
              setProfileID={setProfileID}
              setProfiles={setProfiles}
            />
          )}
        {currentPage === "Student" && currentTab === "Voortgang" && (
          <Tab_Voortgang profileID={profileID} />
        )}
        {currentPage === "Analyse" && <Page_Analyse />}
        {currentPage === "User" && currentTab === "NAW" && 
          <Page_User 
            currentTab={currentTab}
          />}
        {currentPage === "User" && currentTab === "Uren" && 
          <Page_UrenRegistraties 
            currentTab={currentTab}
          />}
      </main>)}

      {!dataLoaded && (<Spinner />)}
    </>
  );
}