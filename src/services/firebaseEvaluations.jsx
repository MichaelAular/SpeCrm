import { db } from '@/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Get specific evaluation week from Firestore Database by profile id and week id
export const getEvaluation = (profileId, weekId) => {
    const evaluationDocRef = doc(db, 'profiles', profileId, 'evaluations', weekId);
    return getDoc(evaluationDocRef);
};

// Add new evaluation to Firestore Database
export const addEvaluation = async (data) => {
    try {
        const docRef = await setDoc(doc(db, "profiles", profileId, 'evaluations', data.id), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}

// Update existing evaluation to Firestore Database
export const updateEvaluation = async (data) => {
    try {
        const evaluationDocRef = doc(db, "profiles", profileId, 'evaluations', data.id);
        const docRef = await updateDoc(evaluationDocRef, data);
        console.log("Document updated with ID: ", docRef.id);
    } catch (data) {
        console.error("Error updating document: ", data);
    }
}