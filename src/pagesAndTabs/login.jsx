"use client";
import React, { useState } from "react";
import { signIn } from "@/app/auth";
import styles from "./login.module.css";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export function Page_Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setloginFailed] = useState(false);

  const handleSignIn = async () => {
    try {
        setloginFailed(false);
        const res = await signIn(email, password);
        sessionStorage.setItem('user', res.user.uid);
        setPassword('');
    }catch(e){
        setloginFailed(true);
        console.error(e)
    }
  };

  return (
    <main className={styles.mainCentered} style={{paddingTop: "10rem"}}>
        <div className={styles.container}>

        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
            <h2 className="text-white text-2xl mb-5">Inloggen bij Stichting SPE</h2>
            <label htmlFor="email">E-mail</label><br/>
            <input className={styles.input}
              type="email" 
              placeholder="Voer je e-mailadres in" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            /><br/>
            <label htmlFor="password">Wachtwoord</label><br/>
            <input className={styles.input}
              type="password" 
              placeholder="Voer je wachtwoord in" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            /><br/>
            <br></br>
            <Button
              onClick={handleSignIn}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inloggen
            </Button>
            <br></br>
            {loginFailed && (
              <Alert severity="error">Inloggen mislukt. Probeer het opnieuw.</Alert>
            )}
          </div>
        </div>
        </div>
    </main>
  );
}