import { useEffect, useState } from "react";
import { signOut as firebaseSignOut, createUserWithEmailAndPassword, sendPasswordResetEmail, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';

export async function signUp(email, password) {
  try { 
    const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
    // const user = userCredential.user; // Save user info to Firestore 
    // await setDoc(doc(db, 'users', user.uid), { uid: user.uid, email}); 
    console.log('User created:', userCredential); 
    return userCredential.user;
  } catch (error) { 
    console.error('Error creating user:', error); 
    return null;
  }
}

export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  sessionStorage.setItem('user', '');
  return firebaseSignOut(auth);
}

export async function triggerResetEmail(email) {
  await sendPasswordResetEmail(auth, email);
  console.log("Password reset email sent");
}

export function useUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsubscribe();
  }, []);

  return currentUser;
}