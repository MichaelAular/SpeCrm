import React, { useState } from "react";
import styles from "../app/page.module.scss";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { EvaluatieInput } from "@/components/evaluatieInput/evaluatieInput";
import { EvaluatieWeek } from "@/components/evaluatieWeek/evaluatieWeek";
import { WeekPicker } from "@/components/weekPicker/weekpicker";

dayjs.extend(isBetweenPlugin);

export function Tab_Evaluatie() {
    const [value, setValue] = useState(dayjs("2024-04-17"));

  return (
    <div className="tabEvaluatieContainer" >
      <div className={styles.textContainer} >
        <h1 className="pageTitle" >Evaluatie</h1>
      </div>
      <main className={styles.evaluatieScheme}>
        <div className="weekPickerContainer">
        <WeekPicker
          value={value}
          setValue={setValue}
        /></div>
        {/* <EvaluatieInput /> */}
      </main>
    </div>
  );
}
