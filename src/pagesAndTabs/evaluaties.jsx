import React, { useState, useEffect } from "react";
import styles from "../app/page.module.scss";
import { FormElement } from "@/components/formElement/formElement";
import dayjs from "dayjs";
import { WeekPicker } from "@/components/weekPicker/weekpicker";
import * as firebaseEvaluation from "../services/firebaseEvaluations";
require('dayjs/locale/nl')

export function Tab_Evaluatie({
  profileID
}) {
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("nl"));
  const [evaluationContent, setEvaluationContent] = useState([]);

  const evaluationContentUpdater = (firebaseData, formData) => {
    Object.keys(formData).forEach(key => {
        const index = parseInt(key[0]);
        const field = key.slice(1);
        if (firebaseData[index]) {
            firebaseData[index][field] = formData[key];
        }
    });
    return firebaseData;
};

  const handleChange = (event, preventDef) => {
    preventDef && event.preventDefault();
    const formData = new FormData(document.getElementById("form"));
    const formObject = Object.fromEntries(formData.entries());
    setEvaluationContent(evaluationContentUpdater(evaluationContent, formObject));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const weekId = weekIdMaker(selectedDate);
    const cleanedContent = evaluationContent.map(item => {
      delete item.week;
      delete item.isNotSet;
      return item;
    }).filter(item => {
      const keys = Object.keys(item);
      return keys.some(key => key !== "date" && item[key] !== "");
    });

    await firebaseEvaluation.updateEvaluation(profileID, weekId, cleanedContent);
    getEvaluationContent();
  };

  const weekIdMaker = (date) => {
    const year = date.year();
    const week = date.week().toString().padStart(2, '0');
    return `${year}-${week}`;
  }

  const generateWeekEvaluation = (evaluations) => {
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
          "date": dayInWeek.toDate(),
          "homework": "",
          "behaviour": "",
          "learningObjectives": "",
          "workingIndependently": "",
          "voSubjects": "",
          "voBehaviour": "",
          "remarks": "",
          "week": weekIdMaker(selectedDate),
          "isNotSet": 1
        })
      }
    }
    return lessonDayList;
  }

  const getEvaluationContent = () => {
    firebaseEvaluation.getEvaluation(profileID, weekIdMaker(selectedDate)).then((doc) => {
      if (doc.exists) {
        const evaluationContentData = doc.data();
        if (evaluationContentData) {
          evaluationContentData.lessonDays.forEach((lessonDay) => {
            lessonDay.date = lessonDay.date.toDate();
            lessonDay.week = weekIdMaker(selectedDate);
          });
          setEvaluationContent(generateWeekEvaluation(evaluationContentData));
        } else {
          setEvaluationContent(generateWeekEvaluation())
        }
      } else {
        console.log("Document not found");
      }
    })
  }
   

  useEffect(() => {
    getEvaluationContent();
  }, [selectedDate]);

  return (
    <div className="tabEvaluatieContainer" >
      <div className={styles.textContainer} >
        <h1 className="pageTitle">Evaluatie</h1>
      </div>
      <main className={styles.evaluatieScheme}>
        <div className="weekPickerContainer">
          <WeekPicker value={selectedDate} setValue={setSelectedDate}/>
        </div>
        <div className={styles.pageCollumn}>
          <form
            id="form"
            className="tabProfielContainer"
            method="post"
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.key === "Tab" && handleChange(e, false)}
            onChange={(e) => handleChange(e, true)}
            onBlur={(e) => handleChange(e, true)}
          >
            <FormElement
              elementTitle="evaluatie"
              elementArray={evaluationContent.map((evaluaties, index) => {
                return {"evaluaties": evaluaties, "index": index};
              })}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
