import React, { useState, useEffect } from "react";
import { generateDashboardData } from "../services/firebaseDashboard";
import { SingleNumberCard } from "@/components/cards/numberCard";
import { TableCard } from "@/components/cards/tableCard";
import { PieChartCard } from "@/components/cards/pieChartCard";
import { BarChartCard } from "@/components/cards/barChartCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../components/cards/cards.scss";

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
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Analyse</h1>
        </Grid>
        <Grid item xs={12}>
          <PieChartCard className={"analyse-column"} title={"Leerling aantallen"} series={leerlingCountPieChartSeries}></PieChartCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SingleNumberCard
            className={"analyse-column"}
            title={"Aantal leerlingen met een Stadspas"}
            value={`${cityPassCount['ja']} Leerlingen (${Math.round(cityPassCount['ja'] * 100 / profileCount.totalCount)}%)`}
          ></SingleNumberCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SingleNumberCard
            className={"analyse-column"}
            title={"Aantal leerlingen met ouders in de uitkering"}
            value={`${benefitsCount['ja']} Leerlingen (${Math.round(benefitsCount['ja'] * 100 / profileCount.totalCount)}%)`}
          ></SingleNumberCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SingleNumberCard
            className={"analyse-column"}
            title={"Aantal op het speciaal onderwijs"}
            value={`${specialEducationCount['ja']} Leerlingen (${Math.round(specialEducationCount['ja'] * 100 / profileCount.totalCount)}%)`}
          ></SingleNumberCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TableCard className={"analyse-column"} title={"Stadsdelen"} value={wijkenCounts} headers={["Wijknaam", "Aantal leerlingen"]}></TableCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TableCard className={"analyse-column"} title={"School soorten"} value={schoolTypeCounts} headers={["School soort", "Aantal leerlingen"]}></TableCard>
        </Grid>
        <Grid item xs={12}>
          <BarChartCard className={"analyse-column"} title={"Doel van aanmelding"} dataset={registrationPurposeCounts}></BarChartCard>
        </Grid>
      </Grid>
    </Container>
  );
}
