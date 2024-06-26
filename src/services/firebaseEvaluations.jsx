import { db } from '@/firebase';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Get specific evaluation week from Firestore Database by profile id and week id
export const getEvaluation = (profileId, weekId) => {
    const evaluationDocRef = doc(db, 'profiles', profileId, 'evaluations', weekId);
    return getDoc(evaluationDocRef);
};

// Add new evaluation to Firestore Database
export const addEvaluation = async (profileId, weekId, lessonDaysData, progressMonitorData) => {
    try {
        lessonDaysData && await setDoc(doc(db, "profiles", profileId, 'evaluations', weekId), { "lessonDays": lessonDaysData });
        progressMonitorData && await setDoc(doc(db, "profiles", profileId, 'evaluations', weekId), { "progressMonitor": progressMonitorData });
        console.log("Document written with ID: ", weekId);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}

// Update existing evaluation to Firestore Database
export const updateEvaluation = async (profileId, weekId, lessonDaysData, progressMonitorData) => {
    const evaluationDocRef = doc(db, "profiles", profileId, 'evaluations', weekId);
    try {
        const docSnap = await getDoc(evaluationDocRef);
        if (docSnap.exists()) {
            lessonDaysData && await updateDoc(evaluationDocRef, { "lessonDays": lessonDaysData });
            progressMonitorData && await updateDoc(evaluationDocRef, { "progressMonitor": progressMonitorData });
            console.log("Document updated with ID: ", weekId);
        } else {
            await addEvaluation(profileId, weekId, lessonDaysData, progressMonitorData);
        }
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}