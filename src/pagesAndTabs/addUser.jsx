import React, { useState, useEffect } from "react";
import options from "../../dropdownOptions.json";
import { FormElement } from "@/components/formElement/formElement";
import { createAccount } from "../services/firebaseUsers"
import { SaveIcon } from "@/assets/icons/save";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export function Page_AddUser({currentUser}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    
  }, []);

  const handleChange = (e, preventDef) => {
    preventDef && e.preventDefault();
    const formData = new FormData(document.getElementById("formNewAccount"));
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
  }

  const handleSubmit = async (event) => {
    console.log('submit triggered');
    event.preventDefault();
    const formData = new FormData(document.getElementById("formNewAccount"));
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject)
    setFirstName(formObject.firstName);
    setLastName(formObject.lastName);
    setEmail(formObject.email);
    setPassword(formObject.password);
    var permissions;
    if (formObject.role == 'Admin') {
      permissions = {
        accountProfile: 'read-write',
        addAccount: 'read-write',
        analysis: 'read-write',
        analysisHours: 'read-write',
        evaluation: 'read-write',
        hourRegistration: 'read-write',
        progress: 'read-write',
        studentList: 'read-write',
        studentListProfileBasic: 'read-write',
        studentListProfileConfidential: 'read-write'
      };
    } else if (formObject.role == 'Studentbegeleider') {
      permissions = {
        accountProfile: 'read-write',
        addAccount: 'denied',
        analysis: 'denied',
        analysisHours: 'denied',
        evaluation: 'read-write',
        hourRegistration: 'read-write',
        progress: 'read-write',
        studentList: 'read-only',
        studentListProfileBasic: 'read-write',
        studentListProfileConfidential: 'denied'
      };
    }
    var result = await createAccount(formObject.email, formObject.password, formObject.firstName, formObject.lastName, permissions);
    if (result) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } else {

    }
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={1} md={11}>
            <h1>Gebruiker toevoegen</h1>
          </Grid>
          <Grid item xs={2} md={1} container justifyContent="flex-end" alignItems="center">
            <button
              type="submit"
              form="formNewAccount"
              className="headerBtn">
              <SaveIcon
                color={"#FFFFFF"}
                className="saveBtn"
                size="18"
              />
            </button>
        </Grid>
        </Grid>
        <form
          id="formNewAccount"
          className="tabAddAccountContainer"
          method="post"
          onSubmit={e => handleSubmit(e)}
          onKeyDown={(e) => e.key === "Tab" && handleChange(e, false)}
          onChange={(e) => handleChange(e, true)}
          onBlur={(e) => handleChange(e, true)}>
          <Grid container spacing={2}>
            {(
              <Grid item xs={12}>
              <FormElement
                elementTitle="Gegevens"
                elementBars={[
                  {
                    title: "voornaam",
                    input: firstName,
                    name: "firstName",
                    type: "string",
                    required: true
                  },
                  {
                    title: "achternaam",
                    input: lastName,
                    name: "lastName",
                    type: "string",
                    required: true
                  },
                  {
                    title: "e-mailadres",
                    input: email,
                    name: "email",
                    type: "email",
                    required: true
                  },
                  {
                    title: "(tijdelijk) wachtwoord",
                    input: password,
                    name: "password",
                    type: "password",
                    required: true
                  },
                  {
                    title: "rol",
                    input: role,
                    name: "role",
                    type: "dropdown",
                    options: options.accountRoles,
                    required: true
                  },
                ]}
              />
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </div>
  );
}
