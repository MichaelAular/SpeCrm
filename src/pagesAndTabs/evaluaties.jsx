import React, { useState, useEffect } from "react";
import styles from "../app/page.module.scss";
import { FormElement } from "@/components/formElement/formElement";
import dayjs from "dayjs";
import { WeekPicker } from "@/components/weekPicker/weekpicker";
import * as firebaseEvaluation from "../services/firebaseEvaluations";
import options from "../../dropdownOptions.json";
require('dayjs/locale/nl')

export function Tab_Evaluatie({
  profileID
}) {
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("nl"));
  const [evaluationContent, setEvaluationContent] = useState([]);
  const [progressContent, setProgressContent] = useState();

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

const progressContentUpdater = (firebaseData, formData) => {
  for (const key in formData) {
    const keyParts = key.split('.');
    let current = firebaseData;
    for (let i = 0; i < keyParts.length - 1; i++) {
      const part = keyParts[i];
      current = current[part] || (current[part] = {});
    }
    current[keyParts[keyParts.length - 1]] = 
      isNaN(formData[key]) ? formData[key] : parseInt(formData[key]);
  }
  return firebaseData;
};

  const handleChange = (event, preventDef) => {
    preventDef && event.preventDefault();
    const formData = new FormData(document.getElementById("form"));
    const formObject = Object.fromEntries(formData.entries());
    setEvaluationContent(evaluationContentUpdater(evaluationContent, formObject));
    setProgressContent(progressContentUpdater(progressContent, formObject));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const weekId = weekIdMaker(selectedDate);
    const lessonDaysContent = evaluationContent.map(item => {
      delete item.week;
      delete item.isNotSet;
      return item;
    }).filter(item => {
      const keys = Object.keys(item);
      return keys.some(key => key !== "date" && item[key] !== "");
    });

    await firebaseEvaluation.updateEvaluation(profileID, weekId, lessonDaysContent, progressContent.progressMonitor);
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
      const lessonDay = evaluations?.lessonDays?.find(
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
  
  const generateProgress = (progress) => {
    const progressList = [];

    const valueMaker = (value) => {
      if (value !== undefined) {
        return value
      } else {
        return null
      }
    }

    progressList.push({
      "name": "dutchLanguage",
      "title": "Taal/Nederlands",
      "fields": [
        { "name": "readingLevel", "value": valueMaker(progress?.dutchLanguage?.readingLevel), "title": "Leesniveau", "options": options.progressGrades, "type": "dropdown" },
        { "name": "readingComprehension", "value": valueMaker(progress?.dutchLanguage?.readingComprehension), "title": "Begrijpend lezen", "options": options.progressGrades, "type": "dropdown" },
        { "name": "vocabulary", "value": valueMaker(progress?.dutchLanguage?.vocabulary), "title": "Woordenschat", "options": options.progressGrades, "type": "dropdown" },
        { "name": "spelling", "value": valueMaker(progress?.dutchLanguage?.spelling), "title": "Spelling", "options": options.progressGrades, "type": "dropdown" },
        { "name": "particularities", "value": progress?.dutchLanguage?.particularities || "", "title": "Bijzonderheden", "type": "string" }
      ]
    })
    progressList.push({
      "name": "mathematics",
      "title": "Rekenen/Wiskunde",
      "fields": [
        { "name": "addition", "value": valueMaker(progress?.mathematics?.addition), "title": "Optellen", "options": options.progressGrades, "type": "dropdown" },
        { "name": "subtraction", "value": valueMaker(progress?.mathematics?.subtraction), "title": "Aftrekken", "options": options.progressGrades, "type": "dropdown" },
        { "name": "multiply", "value": valueMaker(progress?.mathematics?.multiply), "title": "Vermenigvuldigen", "options": options.progressGrades, "type": "dropdown" },
        { "name": "multiplicationSums", "value": valueMaker(progress?.mathematics?.multiplicationSums), "title": "Keersomen", "options": options.progressGrades, "type": "dropdown" },
        { "name": "dividing", "value": valueMaker(progress?.mathematics?.dividing), "title": "Delen door", "options": options.progressGrades, "type": "dropdown" },
        { "name": "fractions", "value": valueMaker(progress?.mathematics?.fractions), "title": "Breuken", "options": options.progressGrades, "type": "dropdown" },
        { "name": "percentages", "value": valueMaker(progress?.mathematics?.percentages), "title": "Procenten", "options": options.progressGrades, "type": "dropdown" },
        { "name": "particularities", "value": progress?.mathematics?.particularities || "", "title": "Bijzonderheden", "type": "string" }
      ]
    })

    return progressList;
  }

  const getEvaluationContent = () => {
    firebaseEvaluation.getEvaluation(profileID, weekIdMaker(selectedDate)).then((doc) => {
      if (doc.exists) {
        const evaluationContentData = doc.data();
        if (evaluationContentData) {
          evaluationContentData.lessonDays?.forEach((lessonDay) => {
            lessonDay.date = lessonDay.date.toDate();
            lessonDay.week = weekIdMaker(selectedDate);
          });
          setEvaluationContent(generateWeekEvaluation(evaluationContentData));
          setProgressContent(generateProgress(evaluationContentData.progressMonitor));
        } else {
          setEvaluationContent(generateWeekEvaluation());
          setProgressContent(generateProgress());
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
        <form
            id="form"
            className="tabProfielContainer"
            method="post"
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.key === "Tab" && handleChange(e, false)}
            onChange={(e) => handleChange(e, true)}
            onBlur={(e) => handleChange(e, true)}
          >
          <div className={styles.pageCollumn}>
            <FormElement
              elementTitle="evaluatie"
              elementArray={evaluationContent.map((evaluaties, index) => ({ evaluaties, index }))}
            />
          </div>
          <div className={styles.pageCollumn}>
            {progressContent &&
              <FormElement
                elementTitle="Leerling voortgang"
                elementArray={progressContent}
              />
            }
          </div>
          </form>
      </main>
    </div>
  );
}