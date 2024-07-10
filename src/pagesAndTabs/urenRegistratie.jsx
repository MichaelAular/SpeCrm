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

export function Page_UrenRegistratie({ currentTab }) {
  const [currentUser, setCurrentUser] = useState(null);
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
            <h1>Evaluatie</h1>
          </Grid>
          <Grid item xs={12}>
            <div className="weekPickerContainer">
              <WeekPicker value={selectedDate} setValue={setSelectedDate} />
            </div>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "0px" }}>
            {/* <FormElement
              elementTitle="evaluatie"
              elementArray={evaluationContent.map((evaluaties, index) => ({ evaluaties, index }))}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
