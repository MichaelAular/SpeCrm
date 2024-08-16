import React, { useState, useEffect } from "react";
import { generateDashboardData, generateHourRegistrationData } from "../services/firebaseDashboard";
import { fetchAccountNames } from "../services/firebaseUsers"
import { SingleNumberCard } from "@/components/cards/numberCard";
import { TableCard } from "@/components/cards/tableCard";
import { PieChartCard } from "@/components/cards/pieChartCard";
import { BarChartCard } from "@/components/cards/barChartCard";
import { Datepicker } from "@/components/datePicker/datePicker";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { CloseIcon } from "@/assets/icons/close";
import "../components/cards/cards.scss";
import dayjs from "dayjs";
require('dayjs/locale/nl')

const getCurrentDate = () => new Date();
const getCurrentYear = () => getCurrentDate().getFullYear();
const getPastDefaultDate = () => new Date(getCurrentYear(), (getCurrentDate().getMonth() - 1), getCurrentDate().getDate());

const generateYearOptions = (startYear) => {
  const currentYear = getCurrentYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

export function Page_Analyse() {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [startDate, setStartDate] = useState(getPastDefaultDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [accountFilter, setAccountFilter] = useState('All');
  const [accountList, setAccountList] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    profileCount: { totalCount: 0, beforeLastSeptemberCount: 0, afterLastSeptemberCount: 0 },
    cityPassCount: { "ja": 0, "nee": 0 },
    benefitsCount: { "ja": 0, "nee": 0 },
    schoolTypeCounts: [],
    specialEducationCount: { "ja": 0, "nee": 0 },
    wijkenCounts: [],
    registrationPurposeCounts: []
  });

  const [hourRegistrationData, setHourRegistrationData] = useState({
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
    generateDashboardData(year, month)
      .then(setDashboardData)
      .catch(console.log);
  }, [year, month]);

  useEffect(() => {
    generateHourRegistrationData(startDate, endDate, accountFilter)
      .then(setHourRegistrationData)
      .catch(console.log);
  }, [startDate, endDate, accountFilter]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleStartChange = (event) => {
    setStartDate(dayjs(event, "DD-MM-YYYY").toDate());
  };

  const handleEndChange = (event) => {
    setEndDate(dayjs(event, "DD-MM-YYYY").toDate());
  };

  const handleAccountChange = (event) => {
    setAccountFilter(event.target.value);
  };

  const { profileCount, cityPassCount, benefitsCount, schoolTypeCounts, specialEducationCount, wijkenCounts, registrationPurposeCounts } = dashboardData;
  const { hoursPerProject, hoursPerProduct, hoursPerActivity } = hourRegistrationData;

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

  const leerlingCountFilteredPieChartSeries = [
    {
      innerRadius: 0,
      outerRadius: 100,
      data: [
        { value: profileCount.newCurrentMonthCount, label: 'Nieuwe aanmeldingen' },
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
        <Grid item xs={4} md={3}>
          <FormControl fullWidth>
            <Select labelId="year-select-label" value={year} onChange={handleYearChange} label="Year">
              <MenuItem value="0">Filter op jaar</MenuItem>
              {generateYearOptions(2023).map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={3}>
          <FormControl fullWidth>
            <Select labelId="month-select-label" value={month} onChange={handleMonthChange} label="Month">
            <MenuItem value="0">Filter op maand</MenuItem>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <MenuItem key={month} value={month}>{dayjs().month(month - 1).locale("nl").format("MMMM")}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={6}>
          {(year != 0 || month != 0) && <button
              className="headerBtn prevent-select"
              onClick={() => {
                setYear(0);
                setMonth(0);
              }}
            >
            <span style={{ color: "#FFFFFF", padding: "0 10px"}}>Filter verwijderen</span>
            <CloseIcon
                color="#FFFFFF"
                 size="18"
              />
          </button>}
        </Grid>
        <Grid item xs={12}>
          <PieChartCard 
            className={"analyse-column"} 
            title={(year == 0 && month == 0) ? "Leerling aantallen dit schooljaar" : "Leerling aantallen"} 
            series={(year == 0 && month == 0) ? leerlingCountPieChartSeries : leerlingCountFilteredPieChartSeries}>
          </PieChartCard>
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
        <Grid item xs={6} md={5}>
          <Grid container spacing={2}>
          <Grid item xs={5}><Datepicker required="true" input={startDate} name="Start date" newDate={handleStartChange}/></Grid>
          <Grid item xs={1}><p> tot </p></Grid>
          <Grid item xs={5}><Datepicker required="true" input={endDate} name="End date" newDate={handleEndChange} /></Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <Select labelId="account-select-label" value={accountFilter} onChange={handleAccountChange} label="Account">
              <MenuItem key="All" selected value='All'>Alle accounts</MenuItem>
              {accountList && accountList.map(account => (
                <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={0} md={4}></Grid>
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
