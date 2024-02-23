"use client";
import "./page"
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from '../services/firebaseProfiles';
import { Header } from "@/components/header/header";
import { Page_User } from "@/pagesAndTabs/user";
import { Page_Students } from "@/pagesAndTabs/students";
import { Tab_Analyse } from "@/pagesAndTabs/analyse";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluatie";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Studenten");
  const [currentTab, setCurrentTab] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [dataLoaded, setLoaded] = useState(false);
  const [profiles, setProfiles] = useState();
  const [profileID, setProfileID] = useState(null);

   useEffect(() => {
    FirestoreProfileService.fetchProfileNameList()
      .then(doc => {
        if (doc.exists) {
          setProfiles(doc.data());
          setLoaded(true);
        } else {
          console.log('Document not found')
        }
      })
      .catch(() => console.log('Error'));
    }, [])

    useEffect(() => {
      profileID !== null && FirestoreProfileService.getProfile(profileID)
      .then(doc => {
        if (doc.exists) {
          setCurrentProfile(doc.data());
        } else {
          console.log('Document not found')
        }
      })
      .catch(() => console.log('Error'));
    }, [profileID])

  return (
    <main>
      <Header
        currentPage={currentPage}
        currentTab={currentTab}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
        profiles={profiles}
        setProfileID={setProfileID}
        profileID={profileID}
        dataLoaded={dataLoaded}
      />
      {currentPage === "Studenten" &&
        <Page_Students
          profiles={profiles}
          setProfileID={setProfileID}
          setCurrentPage={setCurrentPage}
          setCurrentTab={setCurrentTab}
        />
      }
      {currentPage === "User" && <Page_User currentTab={currentTab}/>}
      {currentPage === "Student" && currentTab === "Evaluatie" && <Tab_Evaluatie />}
      {currentPage === "Student" && currentTab === "Profielschets" && currentProfile !== null && <Tab_Profiel currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} dataLoaded={dataLoaded}/>}
      {currentPage === "Student" && currentTab === "Voortgang" && <Tab_Voortgang />}
      {currentPage === "Student" && currentTab === "Analyse" && <Tab_Analyse />}
    </main>
  );
}
