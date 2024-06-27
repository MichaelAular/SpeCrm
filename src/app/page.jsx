"use client";
import "./page";
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from "../services/firebaseProfiles";
import { Header } from "@/components/header/header";
import { Page_User } from "@/pagesAndTabs/user";
import { Page_Students } from "@/pagesAndTabs/students";
import { Page_Analyse } from "@/pagesAndTabs/analyse";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluaties";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";
import { Spinner } from "@/components/spinner/spinner";
import emptyProfile from '../models/profile.json';
import "./page.scss";

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
          const onlyActiveProfiles = {
            "list": doc.data().list.filter(function (el) {
              return el.active == 1;
            })
          }
          setProfiles(onlyActiveProfiles);
          setLoaded(true);
        } else {
          console.log("Document not found");
        }
      })
      .catch(() => console.log("Error"));
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

  if (!profiles) {
    return (<Spinner />)
  } else {
    return (
      <>
        <header>
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
        </header>
        <main>
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
        </main>
      </>
    );
  }
}