"use client";
import "./page";
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from "../services/firebaseProfiles";
import { Header } from "@/components/header/header";
import { Page_User } from "@/pagesAndTabs/user";
import { Page_Students } from "@/pagesAndTabs/students";
import { Page_Analyse } from "@/pagesAndTabs/analyse";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluatie";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Studenten");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentTab, setCurrentTab] = useState(null);
  const [dataLoaded, setLoaded] = useState(false);
  const [profileID, setProfileID] = useState(null);
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    FirestoreProfileService.fetchProfileNameList()
      .then((doc) => {
        if (doc.exists) {
          setProfiles(doc.data());
          setLoaded(true);
        } else {
          console.log("Document not found");
        }
      })
      .catch(() => console.log("Error"));
  }, []);

  useEffect(() => {
    const emptyProfile = require('../models/profile.json')
    const updatedEmptyProfile = { ...emptyProfile, birthDate: new Date() };
    setCurrentProfile(updatedEmptyProfile);
    if (profileID && profileID !== "new_user") {
      FirestoreProfileService.getProfile(profileID)
        .then((doc) => {
          if (doc.exists) {
            const profileContent = doc.data()
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
    <main>
      <Header
        currentPage={currentPage}
        currentTab={currentTab}
        currentProfile={currentProfile}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
        profiles={profiles}
        setProfileID={setProfileID}
        profileID={profileID}
        dataLoaded={dataLoaded}
      />
        {currentPage === "Studenten" && (
          <Page_Students
            profiles={profiles}
            setProfileID={setProfileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
          />
        )}
        {currentPage === "User" && <Page_User currentTab={currentTab} />}
        {currentPage === "Student" && currentTab === "Evaluatie" && (
          <Tab_Evaluatie />
        )}
      {currentPage === "Student" &&
        currentTab === "Profielschets" &&
        currentProfile !== null && (
          <Tab_Profiel
            currentProfile={currentProfile}
            setCurrentProfile={setCurrentProfile}
            dataLoaded={dataLoaded}
            profileID={profileID}
          />
        )}
        {currentPage === "Student" && currentTab === "Voortgang" && (
          <Tab_Voortgang />
        )}
        {currentPage === "Analyse" && <Page_Analyse />}
    </main>
  );
}
