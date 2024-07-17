import { db } from '@/firebase';
import { doc, getDoc, where, getDocs, collection, query, addDoc, updateDoc } from "firebase/firestore";

// Get specific evaluation week from Firestore Database by profile id and week id
export const getHourRegistrationWeek = async (userId, weekId) => {
    const evaluationDocRef = await getDocs(query(collection(db, 'accounts', userId, 'hours'), where('weekId', '==', weekId)));
    const profiles = evaluationDocRef.docs.map(doc => doc.data());
    return profiles;
};

// Get all evaluations from Firestore Database by profile id
export const getHourRegistrations = async (userId) => {
    const evaluationsRef = collection(db, 'accounts', userId, 'hours');
    try {
      const querySnapshot = await getDocs(evaluationsRef);
      const evaluations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return evaluations;
    } catch (error) {
      console.error('Error fetching evaluations: ', error);
      return [];
    }
  };

// Add new evaluation to Firestore Database
export const addHourRegistration = async (userId, weekId, hoursData) => {
    try {
        hoursData && await addDoc(collection(db, "accounts", userId, 'hours'), hoursData);
        console.log("Document written with ID: ", weekId);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}

// Update existing evaluation to Firestore Database
// export const updateHourRegistration = async (profileId, weekId, lessonDaysData, progressMonitorData) => {
//     const evaluationDocRef = doc(db, "profiles", profileId, 'evaluations', weekId);
//     try {
//         const docSnap = await getDoc(evaluationDocRef);
//         if (docSnap.exists()) {
//             lessonDaysData && await updateDoc(evaluationDocRef, { "lessonDays": lessonDaysData });
//             progressMonitorData && await updateDoc(evaluationDocRef, { "progressMonitor": progressMonitorData });
//             console.log("Document updated with ID: ", weekId);
//         } else {
//             await addEvaluation(profileId, weekId, lessonDaysData, progressMonitorData);
//         }
//     } catch (error) {
//         console.error("Error updating document: ", error);
//     }
// }