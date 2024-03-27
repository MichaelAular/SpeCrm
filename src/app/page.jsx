"use client";
import "./page";
import React, { useState, useEffect, useReducer } from "react";
import * as FirestoreProfileService from "../services/firebaseProfiles";
import { Header } from "@/components/header/header";
import { Page_User } from "@/pagesAndTabs/user";
import { Page_Students } from "@/pagesAndTabs/students";
import { Page_Analyse } from "@/pagesAndTabs/analyse";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluatie";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";
import { useGetAge } from "@/hooks/getAge";
import { useOverwriteCurrentProfile } from "@/hooks/overwriteCurrentProfile";

export default function Home() {
  const [age, setAge] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [currentPage, setCurrentPage] = useState("Studenten");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentTab, setCurrentTab] = useState(null);
  const [dataLoaded, setLoaded] = useState(false);
  const [profileID, setProfileID] = useState(null);
  const [profiles, setProfiles] = useState();

  const converteDate =(dateString)=> {
    let dateParts = dateString.split("-");
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject.toString();
  }

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
    profileID !== null &&
      FirestoreProfileService.getProfile(profileID)
        .then((doc) => {
          if (doc.exists) {
            setCurrentProfile(doc.data());
          } else {
            console.log("Document not found");
          }
        })
        .catch(() => console.log("Error"));
  }, [profileID]);

   useEffect(() => {
     const update = () => {
        setBirthDate(new Date(currentProfile.birthDate.toDate()));
        setAge(useGetAge(currentProfile.birthDate.toDate(), "timestamp"));
      }
      currentProfile && update();
    }, [currentProfile]);

  const handleSubmit = (e, update, preventDef) => {
    const formData = new FormData(document.getElementById("form"));
    const newFormObject = Object.fromEntries(formData.entries());
    const newAge = newFormObject.birthDate ? useGetAge(newFormObject.birthDate) : null;
    preventDef && e.preventDefault();
    if (e.key === "Tab" || update === true) {
      const update =()=> {
        setAge(newAge)
        let newDate = converteDate(newFormObject.birthDate)
        setBirthDate(newDate)
      }
      newFormObject.birthDate && update();
      setCurrentProfile(useOverwriteCurrentProfile(currentProfile, newFormObject))
    }
  };

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
      <form
        id="form"
        className="tabProfielContainer"
        method="post"
        onSubmit={(e) => handleSubmit(e, true, true)}
        onKeyDown={(e) => handleSubmit(e, false, false)}
        onMouseDown={(e) => handleSubmit(e, true, false)}
        onMouseOut={(e) => handleSubmit(e, true, false)}
      >
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
              dataLoaded={dataLoaded}
              age={age}
              birthDate={birthDate}
            />
          )}
        {currentPage === "Student" && currentTab === "Voortgang" && (
          <Tab_Voortgang />
        )}
        {currentPage === "Analyse" && <Page_Analyse />}
      </form>
    </main>
  );
}
