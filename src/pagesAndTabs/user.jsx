import styles from "../app/page.module.scss";
import React, { useState, useEffect } from "react";
import * as FirestoreUserService from "../services/firebaseUsers";
import { Spinner } from "@/components/spinner/spinner";
import Skeleton from "@mui/material/Skeleton";
import { FormElement } from "@/components/formElement/formElement";
import { Employee_naw } from "@/components/employee_naw/employee_naw";
import { Modal } from "../components/modal/modal";
import { Save } from "../components//save/save";
import dayjs from "dayjs";

export function Page_User({ currentTab }) {
  const [currentUser, setCurrentUser] = useState(null);

  const uid = sessionStorage.getItem('user');
  console.log(uid);
  useEffect(() => {
    if (uid != "") {
      FirestoreUserService.getUser(uid)
        .then((doc) => {
          if (doc.exists) {
            const userContent = doc.data();
            setCurrentUser(userContent);
            console.log(userContent);
          } else {
            console.log("Document not found");
          }
        })
        .catch(() => console.log("Error"));
    }
  }, [uid]);

  return (
    <div>
      <div
        className={styles.textContainer}
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
      >
        <h1 className="pageTitle">Werknemer</h1>
      </div>
      <main className={styles.main}>
        {currentUser && (
          <div className={styles.pageCollumn}>
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
          </div>
        )}

        {!currentUser && <Skeleton variant="rectangular" width={600} height={200} />}
        {!currentUser && <Spinner />}
      </main>
      {/* <main className={styles.evaluatieScheme} >
        {currentTab === "NAW" && <Employee_naw/>}
      </main> */}
    </div>
  );
}
