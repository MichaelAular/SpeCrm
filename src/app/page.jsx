"use client";
import "./page"
import React, { useState } from "react";
import { Header } from "@/components/header/header";
import { Tab_Evaluatie } from "@/pages/evaluatie/evaluatie";
import { Tab_Profiel } from "@/pages/profiel/profiel";
import { Tab_Voortgang } from "@/pages/voortgang/voortgang";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("Profielschets");

  return (
    <main>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "Evaluatie" && <Tab_Evaluatie />}
      {currentTab === "Profielschets" && <Tab_Profiel />}
      {currentTab === "Voortgang" && <Tab_Voortgang />}
    </main>
  );
}
