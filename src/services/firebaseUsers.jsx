import { db } from '@/firebase';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Get specific user from Firestore Database by id
export const getUser = (userId) => {
    const userDocRef = doc(db, 'accounts', userId);
    return getDoc(userDocRef);
};