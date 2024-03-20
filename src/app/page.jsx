"use client";
import "./page"
import React, { useState, useEffect } from "react";
import * as FirestoreProfileService from '../services/firebaseProfiles';
import { Header } from "@/components/header/header";
import { Page_User } from "@/pagesAndTabs/user";
import { Page_Students } from "@/pagesAndTabs/students";
import { Page_Analyse } from "@/pagesAndTabs/analyse";
import { Tab_Evaluatie } from "@/pagesAndTabs/evaluatie";
import { Tab_Profiel } from "@/pagesAndTabs/profiel";
import { Tab_Voortgang } from "@/pagesAndTabs/voortgang";
import { useGetAge } from "@/hooks/getAge";
import { useDateFormatter } from "@/hooks/dateformatter";
import { useOverwriteCurrentProfile } from "@/hooks/overwriteCurrentProfile";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Studenten");
  const [currentTab, setCurrentTab] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [dataLoaded, setLoaded] = useState(false);
  const [profiles, setProfiles] = useState();
  const [profileID, setProfileID] = useState(null);
  const [age, setAge] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [formJson, setFormJson] = useState(null);

  const handleSubmit = (e) => {
    const form = e.target;
    const formData = new FormData(form);
    e.preventDefault();
    setFormJson(Object.fromEntries(formData.entries()));
  };

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

  useEffect(()=>{
    formJson != null && setAge(useGetAge(formJson.birthDate, "date"));
    formJson != null && setBirthDate(useDateFormatter(formJson.birthDate));
    formJson != null && useOverwriteCurrentProfile(currentProfile, formJson)
  },[formJson])

  useEffect(()=>{
      currentProfile != null && setAge(useGetAge(currentProfile.birthDate.toDate(), "timestamp"))
      currentProfile != null && setBirthDate(new Date(currentProfile.birthDate.toDate()))
  },[currentProfile])

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
        currentProfile={currentProfile}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
        profiles={profiles}
        setProfileID={setProfileID}
        profileID={profileID}
        dataLoaded={dataLoaded}
        formJson={formJson}
      />
      <form
        className="tabProfielContainer"
        method="post"
        onSubmit={handleSubmit}
      >
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
        {currentPage === "Student" && currentTab === "Profielschets" && currentProfile !== null &&
          <Tab_Profiel
            currentProfile={currentProfile}
            dataLoaded={dataLoaded}
            age={age}
            birthDate={birthDate}
          />}
        {currentPage === "Student" && currentTab === "Voortgang" && <Tab_Voortgang />}
        {currentPage === "Analyse" && <Page_Analyse />}
      </form>
    </main>
  );
}
