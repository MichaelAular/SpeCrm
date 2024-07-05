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
        console.log(res.user);
        sessionStorage.setItem('user', res.user.uid);
        //setEmail('');
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
            <label htmlFor="email">E-mail:</label><br/>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            /><br/>
            <label htmlFor="password">Wachtwoord:</label><br/>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
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