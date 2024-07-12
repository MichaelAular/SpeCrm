import React, { useState, useEffect } from "react";
import * as FirestoreUserService from "../services/firebaseUsers";
import { Spinner } from "@/components/spinner/spinner";
import Skeleton from "@mui/material/Skeleton";
import { FormElement } from "@/components/formElement/formElement";
import { Employee_naw } from "@/components/employee_naw/employee_naw";
import { Modal } from "../components/modal/modal";
import { Save } from "../components/save/save";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { WeekPicker } from "@/components/weekPicker/weekpicker";
import * as firebaseHourRegistration from "../services/firebaseHourRegistrations";

export function Page_UrenRegistraties({ currentTab }) {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [hourRegistrationContent, setHourRegistrationContent] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("nl"));

  const uid = sessionStorage.getItem('user');
  useEffect(() => {
    if (uid != "") {
      FirestoreUserService.getUser(uid)
        .then((doc) => {
          if (doc.exists) {
            const userContent = doc.data();
            setCurrentUser(userContent);
          } else {
            console.log("Document not found");
          }
        })
        .catch(() => console.log("Error"));
    }
  }, [uid]);

  const weekIdMaker = (date) => {
    const year = date.year();
    const week = date.week().toString().padStart(2, '0');
    return `${year}-${week}`;
  }

  const generateWeekHourRegistration = (hourRegistrations) => {
    const startOfWeek = selectedDate.startOf('week').add(12, "hour");
    const lessonDayList = [];

    for (let i = 0; i < 6; i++) {
      const dayInWeek = startOfWeek.add(i, 'day');
      const lessonDay = hourRegistrations?.lessonDays?.find(
        (day) => dayjs(day.date).format('YYYY-MM-DD') === dayInWeek.format('YYYY-MM-DD')
      );

      if (lessonDay) {
        lessonDayList.push(lessonDay);
      } else {
        lessonDayList.push({
          "date": dayInWeek.toDate(),
          "startTime": "",
          "endTime": "",
          "description": "",
          "project": "",
          "product": "",
          "activity": "",
          "week": weekIdMaker(selectedDate),
          "isNotSet": 1
        })
      }
    }
    return lessonDayList;
  }

  const getHourRegistrationContent = () => {
    firebaseHourRegistration.getHourRegistration(uid, weekIdMaker(selectedDate)).then((doc) => {
      if (doc.exists) {
        const hourRegistrationContentData = doc.data();
        if (hourRegistrationContentData) {
          hourRegistrationContentData.lessonDays?.forEach((lessonDay) => {
            lessonDay.date = lessonDay.date.toDate();
            lessonDay.week = weekIdMaker(selectedDate);
          });
          setHourRegistrationContent(generateWeekHourRegistration(hourRegistrationContentData));
        } else {
          setHourRegistrationContent(generateWeekHourRegistration());
        }
      } else {
        console.log("Document not found");
      }
    })
  }

  useEffect(() => {
    getHourRegistrationContent();
  }, [selectedDate]);

  return (
    <form
      id="form"
      className="tabProfielContainer"
      method="post"
      // onSubmit={handleSubmit}
      // onKeyDown={(e) => e.key === "Tab" && handleChange(e, false)}
      // onChange={(e) => handleChange(e, true)}
      // onBlur={(e) => handleChange(e, true)}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Uren registratie</h1>
          </Grid>
          <Grid item xs={12}>
            <div className="weekPickerContainer">
              <WeekPicker value={selectedDate} setValue={setSelectedDate} />
            </div>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "0px" }}>
            <FormElement
              elementTitle="Uren registratie"
              elementArray={hourRegistrationContent.map((urenRegistraties, index) => ({ urenRegistraties, index }))}
            />
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
