import React, { useState, useEffect } from "react";
import { BasicTable } from "@/components/table/table";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { AddIcon } from "@/assets/icons/add";

export function Page_Students({ profiles, currentUser, currentLocation, setProfileID, setCurrentPage, setCurrentTab }) {

  return (
    <Container maxWidth="md" style={{paddingTop: "24px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} order={{ xs: 2, sm: 1 }}>
          <h1>Leerlingenlijst - {currentLocation}</h1>
        </Grid>
        {profiles && currentUser && currentUser.permissions.studentList == 'read-write' && <Grid item xs={12} md={6} order={{ xs: 1, sm: 2 }} container justifyContent="flex-end" alignItems="center">
          <button
              className="headerBtn prevent-select"
                onClick={() => {
                  setProfileID("new_user");
                  setCurrentPage("Student");
                  setCurrentTab("Profielschets");
              }}>
              <AddIcon
                color="#FFFFFF"
                size="18"/>
              <span style={{ color: "#FFFFFF", padding: "0 10px"}}>Leerling toevoegen</span>
          </button>   
        </Grid>}
      </Grid>
      <BasicTable
        profiles={profiles}
        setProfileID={setProfileID}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
      />
    </Container>
  );
}
