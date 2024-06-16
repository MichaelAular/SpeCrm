import React, { useState, useEffect } from "react";
import styles from "../app/page.module.scss";
import { FormElement } from "@/components/formElement/formElement";
import dayjs from "dayjs";
import 'dayjs/locale/nl'
import { WeekPicker } from "@/components/weekPicker/weekpicker";
import * as firebaseEvaluation from "../services/firebaseEvaluations";

export function Tab_Evaluatie({
  profileID
}) {
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("nl"));
  const [evaluationContent, setEvaluationContent] = useState([]);

  function getWeekTimestamps(evaluations) {
    const startOfWeek = selectedDate.startOf('week').add(12, "hour");
    const lessonDayList = [];

    for (let i = 0; i < 6; i++) {
      const dayInWeek = startOfWeek.add(i, 'day');
      const lessonDay = evaluations?.lessonDays.find(
        (day) => dayjs(day.date).format('YYYY-MM-DD') === dayInWeek.format('YYYY-MM-DD')
      );

      if (lessonDay) {
        lessonDayList.push(lessonDay);
      } else {
        lessonDayList.push({
          "date": dayInWeek.toISOString(),
          "homework": "",
          "behaviour": "",
          "learningObjectives": "",
          "workingIndependently": "",
          "voSubjects": "",
          "voBehaviour": "",
          "remarks": "",
          "isNotSet": 1
        })
      }
    }
    return lessonDayList;
  }

  useEffect(() => {
    const year = selectedDate.year();
    const week = selectedDate.week().toString().padStart(2, '0');

    firebaseEvaluation.getEvaluation(profileID, `${year}-${week}`).then((doc) => {
      if (doc.exists) {
        const evaluationContentData = doc.data();
        if (evaluationContentData) {
          evaluationContentData.lessonDays.forEach((lessonDay) => {
            lessonDay.date = lessonDay.date.toDate();
          });
          setEvaluationContent(getWeekTimestamps(evaluationContentData));
        } else {
          setEvaluationContent(getWeekTimestamps())
        }
      } else {
        console.log("Document not found");
      }
    })
  }, [selectedDate]);

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
            elementArray={evaluationContent.map((evaluaties) => {
              return evaluaties;
            })}
          />
        </div>
      </main>
    </div>
  );
}
