import React, { useState } from "react";
import styles from "../app/page.module.scss";
import { FormElement } from "@/components/formElement/formElement";
import dayjs from "dayjs";
require('dayjs/locale/nl')
import { WeekPicker } from "@/components/weekPicker/weekpicker";
import temp_evaluations from "./temp_evaluations.json"

export function Tab_Evaluatie({
  evaluation
}) {
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("nl"));
  const allEvaluations = temp_evaluations;

  evaluation = allEvaluations.find(evaluation => {
    const year = selectedDate.year();
    const week = selectedDate.week().toString().padStart(2, '0');
    return evaluation.id === `${year}-${week}`;
  });


  function getWeekTimestamps() {
    const startOfWeek = selectedDate.startOf('week').add(12, "hour");
    const lessonDayList = [];

    for (let i = 0; i < 6; i++) {
      const dayInWeek = startOfWeek.add(i, 'day');
      const lessonDay = evaluation && evaluation['lessonDays'].find(day => day.date.startsWith(dayInWeek.format('YYYY-MM-DD')));

      if (lessonDay) {
        lessonDayList.push(lessonDay);
      } else {
        lessonDayList.push({
          "date": dayInWeek.toISOString(),
          "day": "",
          "presence": "",
          "onTime": "",
          "homework": "",
          "vo_lessonMaterial": "",
          "vo_subjects": "",
          "learningAttitude": "",
          "followingInstructions": "",
          "behaviourToOthers": "",
          "keepsAttention": "",
          "worksIndependently": "",
          "askingQuestions": "",
          "understandingMaterial": "",
          "behaviour": "",
          "remarks": "",
          "isNotSet": 1
        })
      }
    }
    return lessonDayList;
  }

  const timestamps = getWeekTimestamps();

  return (
    <div className="tabEvaluatieContainer" >
      <div className={styles.textContainer} >
        <h1 className="pageTitle" >Evaluatie</h1>
      </div>
      <main className={styles.evaluatieScheme}>
        <div className="weekPickerContainer">
          <WeekPicker
            value={selectedDate}
            setValue={setSelectedDate}
          /></div>

        <div className={styles.pageCollumn}>
          <FormElement
            elementTitle="evaluatie"
            elementArray={timestamps.map((evaluaties) => {
              return evaluaties;
            })}
          />
        </div>
      </main>
    </div>
  );
}
