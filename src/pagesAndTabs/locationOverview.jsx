"use client";
import React, { useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from "./login.module.css";

export function Page_Location({
  setCurrentLocation,
  setCurrentPage
}) {

  return (
    <Container maxWidth="md" style={{paddingTop: "24px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} order={{ xs: 2, sm: 1 }}>
          <h1>Selecteer locatie</h1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div className={styles.container} onClick={()=>{
            setCurrentLocation("amsterdam-zuidoost");
            setCurrentPage("Studenten")
          }}>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
              <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h2 className="text-white text-2xl mb-5">Amsterdam Zuidoost</h2>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.container} onClick={()=>{
            setCurrentLocation("amsterdam-west");
            setCurrentPage("Studenten")
          }}>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
              <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h2 className="text-white text-2xl mb-5">Amsterdam West</h2>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.container} onClick={()=>{
            setCurrentLocation("almere");
            setCurrentPage("Studenten")
          }}>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
              <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h2 className="text-white text-2xl mb-5">Almere</h2>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}