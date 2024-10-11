import React, { useState, useEffect } from "react";
import { FormElement } from "@/components/formElement/formElement";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { WeekPicker } from "@/components/weekPicker/weekpicker";
import * as firebaseHourRegistration from "../services/firebaseHourRegistrations";
import { addHourRegistration, deleteHourRegistration } from "@/services/firebaseHourRegistrations";

export function Page_UrenRegistraties({currentUser}) {

  const [hourRegistrationContent, setHourRegistrationContent] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("nl"));

  const weekIdMaker = (date) => {
    const year = date.year();
    const week = date.week().toString().padStart(2, '0');
    return `${year}-${week}`;
  }

  const generateWeekHourRegistration = (hourRegistrations) => {
    const startOfWeek = selectedDate.startOf('week').add(12, 'hour');
    const hourRegistrationList = [];

    for (let i = 0; i < 7; i++) {
      const dayInWeek = startOfWeek.add(i, 'day');
      const registrationsForDay = hourRegistrations.filter(
        registration => dayjs(registration.date).isSame(dayInWeek, 'day')
      );

      registrationsForDay.sort((a, b) => {
        const startTimeA = parseInt(a.startTime.slice(0, 2));
        const startTimeB = parseInt(b.startTime.slice(0, 2));
        return startTimeA - startTimeB;
      });

      hourRegistrationList.push(registrationsForDay.length !== 0 ? registrationsForDay : [{ date: dayInWeek.toDate(), isNotSet: 1 }]);
    }

    return hourRegistrationList;
  }

  const getHourRegistrationContent = () => {
    firebaseHourRegistration.getHourRegistrationWeek(currentUser.id, weekIdMaker(selectedDate)).then((doc) => {
      if (doc) {
        doc.forEach((registration) => {
          registration.date = registration.date.toDate();
        });
        setHourRegistrationContent(generateWeekHourRegistration(doc));
      } else {
        console.log("Document not found");
      }
    })
  }

  const handleSubmit = (event) => {
    console.log('submit triggered');
    event.preventDefault();
    const formData = new FormData(document.getElementById("hourRegistrationForm"));
    const formObject = Object.fromEntries(formData.entries());
    const weekId = weekIdMaker(dayjs(formObject.date, "DD-MM-YYYY"));
    formObject.date = dayjs(formObject.date, "DD-MM-YYYY").toDate()
    formObject.weekId = weekId
    console.log(formObject);
    addHourRegistration(currentUser.id, weekId, formObject).then(() => {
      getHourRegistrationContent();
    })
  }

  const handleDeleteItem = (event) => {
    console.log(event)
    deleteHourRegistration(currentUser.id, event.id).then(() => {
      getHourRegistrationContent();
    })
  };

  useEffect(() => {
    getHourRegistrationContent();
  }, [selectedDate]);

  return (
    <form
      id="hourRegistrationForm"
      className="tabProfielContainer"
      method="post"
      onSubmit={e => handleSubmit(e)}
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
              elementTitle="Uren overzicht"
              elementArray={hourRegistrationContent.map((urenRegistraties) => ({ urenRegistraties }))}
              handleDeleteItem={handleDeleteItem}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "1rem" }}>
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
