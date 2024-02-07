"use client";
import "./page"
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from '../services/firebaseProfiles';
import { Header } from "@/components/header/header";
import { Page_Students } from "@/pagesAndTabs/students";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluatie";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Studenten");
  const [currentTab, setCurrentTab] = useState("Profielschets");
  const [currentProfile, setCurrentProfile] = useState();
  const [profiles, setProfiles] = useState();
  const [profileID, setProfileID] = useState('KenechiObiuto');
  const [dataLoaded, setLoaded] = useState(false);

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
      FirestoreProfileService.getProfile(profileID)
      .then(doc => {
        if (doc.exists) {
          setCurrentProfile(doc.data());
          setLoaded(true);
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
      />
      {currentPage === "Studenten" &&
      <Page_Students
        profiles={profiles}
        setProfileID={setProfileID}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
      />}
      {currentPage === "Analyse" && currentTab === "Evaluatie" && <Tab_Evaluatie />}
      {currentPage === "Analyse" && currentTab === "Profielschets" && <Tab_Profiel currentProfile={currentProfile} dataLoaded={dataLoaded}/>}
      {currentPage === "Analyse" && currentTab === "Voortgang" && <Tab_Voortgang />}
    </main>
  );
}
