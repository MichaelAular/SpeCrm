import React, { useState, useEffect } from "react";
import styles from "../app/page.module.scss";
import { generateDashboardData } from "../services/firebaseDashboard";
import { SingleNumberCard } from "@/components/analyse/analyseNumberCard";
import { TableCard } from "@/components/analyse/analyseTableCard";
import { PieChartCard } from "@/components/analyse/analysePieChartCard";
import { BarChartCard } from "@/components/analyse/analyseBarChartCard";
import "../components/analyse/analyse.scss";

export function Page_Analyse() {
  const [dashboardData, setDashboardData] = useState({
    profileCount: { totalCount: 0, beforeLastSeptemberCount: 0, afterLastSeptemberCount: 0 },
    cityPassCount: { "ja": 0, "nee": 0 },
    benefitsCount: { "ja": 0, "nee": 0 },
    schoolTypeCounts: [],
    specialEducationCount: { "ja": 0, "nee": 0 },
    wijkenCounts: [],
    registrationPurposeCounts: []
  });

  useEffect(() => {
    generateDashboardData()
      .then(setDashboardData)
      .catch(console.log);
  }, []);

  const { profileCount, cityPassCount, benefitsCount, schoolTypeCounts, specialEducationCount, wijkenCounts, registrationPurposeCounts } = dashboardData;

  const leerlingCountPieChartSeries = [
    {
      innerRadius: 0,
      outerRadius: 100,
      data: [
        { value: profileCount.beforeLastSeptemberCount, label: 'Oude aanmeldingen' },
        { value: profileCount.afterLastSeptemberCount, label: 'Nieuwe aanmeldingen' },
      ],
      arcLabel: 'value',
    },
    {
      innerRadius: 100,
      outerRadius: 130,
      data: [
        { value: profileCount.totalCount, label: 'Totaal', color: 'green' },
      ],
      arcLabel: 'value',
    },
  ];

  return (
    <main className={styles.main}>
      <a className={styles.textContainer}>
        <h1 className="pageTitle">Analyse</h1>
        <div className="analyse-row">
          <PieChartCard className={"analyse-column"} title={"Leerling aantallen"} series={leerlingCountPieChartSeries}></PieChartCard>
        </div>
        <div className="analyse-row">
          <SingleNumberCard
            className={"analyse-column"}
            title={"Aantal leerlingen met een Stadspas"}
            value={`${cityPassCount['ja']} Leerlingen (${Math.round(cityPassCount['ja'] * 100 / profileCount.totalCount)}%)`}
          ></SingleNumberCard>
          <SingleNumberCard
            className={"analyse-column"}
            title={"Aantal leerlingen met ouders in de uitkering"}
            value={`${benefitsCount['ja']} Leerlingen (${Math.round(benefitsCount['ja'] * 100 / profileCount.totalCount)}%)`}
          ></SingleNumberCard>
          <SingleNumberCard
            className={"analyse-column"}
            title={"Aantal op het speciaal onderwijs"}
            value={`${specialEducationCount['ja']} Leerlingen (${Math.round(specialEducationCount['ja'] * 100 / profileCount.totalCount)}%)`}
          ></SingleNumberCard>
        </div>
        <div className="analyse-row">
          <TableCard className={"analyse-column"} title={"Stadsdelen"} value={wijkenCounts} headers={["Wijknaam", "Aantal leerlingen"]}></TableCard>
        </div>
        <div className="analyse-row">
          <TableCard className={"analyse-column"} title={"School soorten"} value={schoolTypeCounts} headers={["School soort", "Aantal leerlingen"]}></TableCard>
        </div>
        <div className="analyse-row">
          <BarChartCard className={"analyse-column"} title={"Doel van aanmelding"} dataset={registrationPurposeCounts}></BarChartCard>
        </div>
      </a>
    </main>
  );
}
