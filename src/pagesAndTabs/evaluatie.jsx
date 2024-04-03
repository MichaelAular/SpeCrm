import React, { useState } from "react";
import styles from "../app/page.module.scss";
import { EvaluatieInput } from "@/components/evaluatieInput/evaluatieInput";
import { EvaluatieWeek } from "@/components/evaluatieWeek/evaluatieWeek";

export function Tab_Evaluatie() {
  const [week, setWeek] = useState("week 1")
  const [year, setYear] = useState(2024)

  return (
    <div className="tabEvaluatieContainer">
      <div className={styles.textContainer}>
        <h1 className="pageTitle">Evaluatie</h1>
      </div>
      <main className={styles.evaluatieScheme}>
        {/* <EvaluatieInput /> */}
        <EvaluatieWeek 
          setWeek={setWeek}
          setYear={setYear}
          week={week}
          year={year}
        />
      </main>
    </div>
  );
}
