"use client";
import React, { useState } from "react";
import { triggerResetEmail } from "@/app/auth";
import styles from "./login.module.css";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export function Page_Reset_Password({currentUser}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const requestReset = async () => {
    try {
      setLoading(true);
      await triggerResetEmail(currentUser.email);
      setLoading(false);
      setSuccess(true);
    }catch(e){
        console.error(e)
    }
  };

  return (
    <main className={styles.mainCentered} style={{paddingTop: "10rem"}}>
        <div className={styles.container}>

        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
            <h2 className="text-white text-2xl mb-5">Wachtwoord resetten</h2>
            <p>Klik op de knop hieronder om je wachtwoord te resetten. Er zal een e-mail worden verstuurd met een link waar je een nieuwe wachtwoord kan aanmaken.</p>
            <Button
              onClick={requestReset}
              fullWidth
              variant="contained"
              disabled = {success}
              sx={{ mt: 3, mb: 2 }}>
              {!loading ? "Resetten": "Versturen..."}
            </Button>
            <br></br>
            {success && (
              <Alert severity="success">Reset link is verzonden naar je e-mailadres. Het kan in de spam-folder terecht komen.</Alert>
            )}
          </div>
        </div>
        </div>
    </main>
  );
}