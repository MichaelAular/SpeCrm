import React, { useState, useEffect } from "react";
import { getEvaluations } from "../services/firebaseEvaluations";
import { LineChartCard } from "@/components/cards/lineChartCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export function Tab_Voortgang({
  profileID
}) {
  const [chartData, setChartData] = useState();

  // Function to transform the data for charting
  const transformDataForChart = (evaluations) => {
    const data = {};

    evaluations.forEach(evaluation => {
      const week = evaluation.id.split('-')[1]; // Extract week number from id
      const progressMonitor = evaluation.progressMonitor;

      if (progressMonitor) {
        Object.keys(progressMonitor).forEach(category => {
          if (!data[category]) {
            data[category] = {};
          }
          console.log(data[category])
          console.log(Object.keys(progressMonitor[category]))

          Object.keys(progressMonitor[category]).forEach(metric => {
            console.log(metric)
            if (!data[category][metric]) {
              data[category][metric] = [];
            }
            data[category][metric].push({ week, value: progressMonitor[category][metric] });
          });
        });
      }
    });
    return data;
  };

  useEffect(() => {
    getEvaluations(profileID)
      .then(data => {
        const transformedData = transformDataForChart(data);
        setChartData(transformedData)
      })
      .catch(console.log);
  }, []);

  const keyTranslator = (key) => {
    key = key === "readingLevel" ? "Leesniveau" : key
    key = key === "readingComprehension" ? "Begrijpend lezen" : key
    key = key === "vocabulary" ? "Woordenschat" : key
    key = key === "spelling" ? "Spelling" : key
    key = key === "particularities" ? "Bijzonderheden" : key
    key = key === "addition" ? "Leesniveau" : key
    key = key === "subtraction" ? "Aftrekken" : key
    key = key === "multiply" ? "Vermenigvuldigen" : key
    key = key === "multiplicationSums" ? "Keersomen" : key
    key = key === "dividing" ? "Delen door" : key
    key = key === "fractions" ? "Breuken" : key
    key = key === "percentages" ? "Procenten" : key
    return key
  }

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <h1>Leerling voortgang</h1>
        </Grid>
        {chartData &&
          <Grid item xs={12}>
            {chartData.dutchLanguage && Object.keys(chartData.dutchLanguage).map(key => (
              <LineChartCard key={key} className={"analyse-column"} title={`Taal - ${keyTranslator(key)}`} dataset={chartData.dutchLanguage[key]}></LineChartCard>
            ))}
            {chartData.mathematics && Object.keys(chartData.mathematics).map(key => (
              <LineChartCard key={key} className={"analyse-column"} title={`Rekenen - ${keyTranslator(key)}`} dataset={chartData.mathematics[key]}></LineChartCard>
            ))}
            {chartData.progressGrades?.nederlands || chartData.testGrades?.nederlands ? (
              <LineChartCard className={"analyse-column"} title={"Nederlands"} dataset={chartData.progressGrades.nederlands} secondDataset={chartData.testGrades.nederlands} />
            ) : null}

            {chartData.progressGrades?.engels || chartData.testGrades?.engels ? (
              <LineChartCard className={"analyse-column"} title={"Engels"} dataset={chartData.progressGrades.engels} secondDataset={chartData.testGrades.engels} />
            ) : null}

            {chartData.progressGrades?.wiskundeA || chartData.testGrades?.wiskundeA ? (
              <LineChartCard className={"analyse-column"} title={"Wiskunde A"} dataset={chartData.progressGrades.wiskundeA} secondDataset={chartData.testGrades.wiskundeA} />
            ) : null}

            {chartData.progressGrades?.wiskundeB || chartData.testGrades?.wiskundeB ? (
              <LineChartCard className={"analyse-column"} title={"Wiskunde B"} dataset={chartData.progressGrades.wiskundeB} secondDataset={chartData.testGrades.wiskundeB} />
            ) : null}

            {chartData.progressGrades?.natuurkunde || chartData.testGrades?.natuurkunde ? (
              <LineChartCard className={"analyse-column"} title={"Natuurkunde"} dataset={chartData.progressGrades.natuurkunde} secondDataset={chartData.testGrades.natuurkunde} />
            ) : null}

            {chartData.progressGrades?.economie || chartData.testGrades?.economie ? (
              <LineChartCard className={"analyse-column"} title={"Economie"} dataset={chartData.progressGrades.economie} secondDataset={chartData.testGrades.economie} />
            ) : null}

            {chartData.progressGrades?.scheikunde || chartData.testGrades?.scheikunde ? (
              <LineChartCard className={"analyse-column"} title={"Scheikunde"} dataset={chartData.progressGrades.scheikunde} secondDataset={chartData.testGrades.scheikunde} />
            ) : null}

            {chartData.progressGrades?.aardrijkskunde || chartData.testGrades?.aardrijkskunde ? (
              <LineChartCard className={"analyse-column"} title={"Aardrijkskunde"} dataset={chartData.progressGrades.aardrijkskunde} secondDataset={chartData.testGrades.aardrijkskunde} />
            ) : null}

            {chartData.progressGrades?.biologie || chartData.testGrades?.biologie ? (
              <LineChartCard className={"analyse-column"} title={"Biologie"} dataset={chartData.progressGrades.biologie} secondDataset={chartData.testGrades.biologie} />
            ) : null}

            {chartData.progressGrades?.maatschappijleer || chartData.testGrades?.maatschappijleer ? (
              <LineChartCard className={"analyse-column"} title={"Maatschappijleer"} dataset={chartData.progressGrades.maatschappijleer} secondDataset={chartData.testGrades.maatschappijleer} />
            ) : null}

            {chartData.progressGrades?.geschiedenis || chartData.testGrades?.geschiedenis ? (
              <LineChartCard className={"analyse-column"} title={"Geschiedenis"} dataset={chartData.progressGrades.geschiedenis} secondDataset={chartData.testGrades.geschiedenis} />
            ) : null}

            {chartData.progressGrades?.frans || chartData.testGrades?.frans ? (
              <LineChartCard className={"analyse-column"} title={"Frans"} dataset={chartData.progressGrades.frans} secondDataset={chartData.testGrades.frans} />
            ) : null}

            {chartData.progressGrades?.duits || chartData.testGrades?.duits ? (
              <LineChartCard className={"analyse-column"} title={"Duits"} dataset={chartData.progressGrades.duits} secondDataset={chartData.testGrades.duits} />
            ) : null}

            {chartData.progressGrades?.spaans || chartData.testGrades?.spaans ? (
              <LineChartCard className={"analyse-column"} title={"Spaans"} dataset={chartData.progressGrades.spaans} secondDataset={chartData.testGrades.spaans} />
            ) : null}

            {chartData.progressGrades?.overig || chartData.testGrades?.overig ? (
              <LineChartCard className={"analyse-column"} title={"Overig"} dataset={chartData.progressGrades.overig} secondDataset={chartData.testGrades.overig} />
            ) : null}

            {chartData.progressGrades?.particularities || chartData.testGrades?.particularities ? (
              <LineChartCard className={"analyse-column"} title={"Bijzonderheden"} dataset={chartData.progressGrades.particularities} secondDataset={chartData.testGrades.particularities} />
            ) : null}
          </Grid>
        }
      </Grid>
    </Container >
  );
}