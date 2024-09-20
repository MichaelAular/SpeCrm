import React, { useState, useEffect } from "react";
import * as FirestoreUserService from "../services/firebaseUsers";
import { Spinner } from "@/components/spinner/spinner";
import Skeleton from "@mui/material/Skeleton";
import { FormElement } from "@/components/formElement/formElement";
import { Employee_naw } from "@/components/employee_naw/employee_naw";
import { Modal } from "../components/modal/modal";
import { Save } from "../components//save/save";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";

export function Page_User({ currentAccount }) {
  const [currentUser, setCurrentUser] = useState(null);

  const uid = sessionStorage.getItem('user');
  useEffect(() => {
    if (currentAccount == null && uid != "") {
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
    } else {
      setCurrentUser(currentAccount);
    }
  }, [uid]);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!currentUser && (<h1>Welkom!</h1>)}
            {currentUser && (<h1>Welkom {currentUser.firstName}!</h1>)}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {currentUser && (
            <Grid item xs={12}>
            <FormElement
              elementTitle="Gegevens"
              elementBars={[
                {
                  title: "voornaam",
                  input: currentUser.firstName,
                  name: "firstName",
                  type: "string",
                  required: true
                },
                {
                  title: "achternaam",
                  input: currentUser.lastName,
                  name: "lastName",
                  type: "string",
                  required: true
                },
                {
                  title: "geboortedatum",
                  input: currentUser.birthDate,
                  name: "birthDate",
                  type: "date",
                  required: false
                },
                {
                  title: "leeftijd",
                  input: dayjs().diff(dayjs(currentUser.birthDate), 'year'),
                  name: "age",
                  type: "string_readOnly",
                  required: false
                },
                {
                  title: "e-mailadres",
                  input: currentUser.email,
                  name: "email",
                  type: "string",
                  required: true
                },
              ]}
            />
            </Grid>
          )}

          {!currentUser && <Spinner />}
        </Grid>
      </Container>
    </div>
  );
}
