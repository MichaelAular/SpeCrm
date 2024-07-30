import React, { useState, useEffect } from "react";
import { generateDashboardData } from "../services/firebaseDashboard";
import { fetchAccountNames } from "../services/firebaseUsers"
import { SingleNumberCard } from "@/components/cards/numberCard";
import { TableCard } from "@/components/cards/tableCard";
import { PieChartCard } from "@/components/cards/pieChartCard";
import { BarChartCard } from "@/components/cards/barChartCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "../components/cards/cards.scss";
import dayjs from "dayjs";
require('dayjs/locale/nl')

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth() + 1;

const generateYearOptions = (startYear) => {
  const currentYear = getCurrentYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

export function Page_Analyse() {
  const [year, setYear] = useState(getCurrentYear());
  const [month, setMonth] = useState(getCurrentMonth());
  const [accountFilter, setAccountFilter] = useState('All');
  const [accountList, setAccountList] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    profileCount: { totalCount: 0, beforeLastSeptemberCount: 0, afterLastSeptemberCount: 0 },
    cityPassCount: { "ja": 0, "nee": 0 },
    benefitsCount: { "ja": 0, "nee": 0 },
    schoolTypeCounts: [],
    specialEducationCount: { "ja": 0, "nee": 0 },
    wijkenCounts: [],
    registrationPurposeCounts: [],
    hoursPerProject: [],
    hoursPerProduct: [],
    hoursPerActivity: []
  });

  useEffect(() => {
    fetchAccountNames()
      .then(setAccountList)
      .catch(console.log);
  }, []);

  useEffect(() => {
    generateDashboardData(year, month, accountFilter)
      .then(setDashboardData)
      .catch(console.log);
  }, [year, month, accountFilter]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleAccountChange = (event) => {
    setAccountFilter(event.target.value);
  };

  const { profileCount, cityPassCount, benefitsCount, schoolTypeCounts, specialEducationCount, wijkenCounts, registrationPurposeCounts, hoursPerProject, hoursPerProduct, hoursPerActivity } = dashboardData;

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Uren overzicht</h1>
        </Grid>
        <Grid item xs={4} lg={2}>
          <FormControl fullWidth>
            <Select labelId="year-select-label" value={year} onChange={handleYearChange} label="Year">
              {generateYearOptions(2024).map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} lg={2}>
          <FormControl fullWidth>
            <Select labelId="month-select-label" value={month} onChange={handleMonthChange} label="Month">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <MenuItem key={month} value={month}>{dayjs().month(month - 1).locale("nl").format("MMMM")}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} lg={2}>
          <FormControl fullWidth>
            <Select labelId="account-select-label" value={accountFilter} onChange={handleAccountChange} label="Account">
              <MenuItem key="All" selected value='All'>Alle accounts</MenuItem>
              {accountList && accountList.map(account => (
                <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={0} lg={6}></Grid>
        {hoursPerProject.length === 0 ? (
          <Grid item xs={12}>
            <h3>Er zijn geen gewerkte uren gevonden</h3>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} lg={4}>
              <TableCard className={"analyse-column"} title={"Gewerkte uren per project"} value={hoursPerProject} headers={["Project", "Aantal uren"]} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TableCard className={"analyse-column"} title={"Gewerkte uren per product"} value={hoursPerProduct} headers={["product", "Aantal uren"]} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TableCard className={"analyse-column"} title={"Gewerkte uren per activiteit"} value={hoursPerActivity} headers={["Activiteit", "Aantal uren"]} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
