import { useEffect, useState } from "react";
import { signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from '@/firebase';

export async function signIn(email, password) {
  //await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  sessionStorage.setItem('user', '');
  return firebaseSignOut(auth);
}

export function useUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsubscribe(); // cleanup function
  }, []);

  return currentUser;
}