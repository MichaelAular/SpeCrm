import { db } from '@/firebase';
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

// Get all profiles from Firestore Database
export const fetchProfiles = async () => {
  return getDocs(collection(db, "profiles"))
}

// Get specific profile from Firestore Database by id
export const getProfile = (profileId) => {
    const profileDocRef = doc(db, 'profiles', profileId)
    return getDoc(profileDocRef);
};

// Add new profile to Firestore Database
export const addProfile = async (data) => {
    const id = data.firstName + data.lastName
    data.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "profiles", id), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}

// Update excisting profile to Firestore Database
export const updateProfile = async (data) => {
    data.preventDefault();

    try {
        const profileRef = doc(db, 'profiles', data.id);
        console.log(data, profileRef);
        const docRef = await updateDoc(profileRef, data);
        console.log("Document updated with ID: ", docRef.id);
    } catch (data) {
        console.error("Error updating document: ", data);
    }
}