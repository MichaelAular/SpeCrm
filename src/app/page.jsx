"use client";
import "./page"
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from '../services/firebaseProfiles';
import { Header } from "@/components/header/header";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluatie";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("students");
  const [currentTab, setCurrentTab] = useState("Profielschets");
  const [currentProfile, setCurrentProfile] = useState();
  const [profiles, setProfiles] = useState();
  const [profileID, setProfileID] = useState('KenechiObiuto');
  const [dataLoaded, setLoaded] = useState(false);
  // const [inputValue, setInputValue] = useState();

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

    console.log("currentProfile:", currentProfile)

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
      {currentTab === "Evaluatie" && <Tab_Evaluatie />}
      {currentTab === "Profielschets" && <Tab_Profiel currentProfile={currentProfile} dataLoaded={dataLoaded}/>}
      {currentTab === "Voortgang" && <Tab_Voortgang />}
    </main>
  );
}
