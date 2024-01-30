"use client";
import "./page"
import React, { useState } from "react";
import { Header } from "@/components/header/header";
import { Tab_Evaluatie } from "@/tabs/evaluatie";
import { Tab_Profiel } from "@/tabs/profiel";
import { Tab_Voortgang } from "@/tabs/voortgang";

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
