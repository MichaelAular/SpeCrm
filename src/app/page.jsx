"use client";
import "./page"
import React, { useState } from "react";
import { Header } from "@/components/header/header";
import { Tab_Evaluatie } from "@/tabs/evaluatie";
import { Tab_Profiel } from "@/tabs/profiel";
import { Tab_Voortgang } from "@/tabs/voortgang";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("students");
  const [currentTab, setCurrentTab] = useState("Profielschets");
  const [currentProfile, setCurrentProfile] = useState();

  return (
    <main>
      <Header
        currentPage={currentPage}
        currentTab={currentTab}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
      />
      {currentTab === "Evaluatie" && <Tab_Evaluatie />}
      {currentTab === "Profielschets" && <Tab_Profiel currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/>}
      {currentTab === "Voortgang" && <Tab_Voortgang />}
    </main>
  );
}
