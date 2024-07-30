import { db } from '@/firebase';
import { doc, getDoc, where, getDocs, collection, query, addDoc, updateDoc } from "firebase/firestore";

// Get specific hour registration week from Firestore Database by profile id and week id
export const getHourRegistrationWeek = async (userId, weekId) => {
    const hourRegistrationDocRef = await getDocs(query(collection(db, 'accounts', userId, 'hours'), where('weekId', '==', weekId)));
    const profiles = hourRegistrationDocRef.docs.map(doc => doc.data());
    return profiles;
};

// Get all hour registration from Firestore Database by profile id
export const getHourRegistrations = async (userId) => {
    const hourRegistrationsRef = collection(db, 'accounts', userId, 'hours');
    try {
      const querySnapshot = await getDocs(hourRegistrationsRef);
      const hourRegistrations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return hourRegistrations;
    } catch (error) {
      console.error('Error fetching hour registrations: ', error);
      return [];
    }
  };

// Add new hour registration to Firestore Database
export const addHourRegistration = async (userId, weekId, hoursData) => {
    try {
        hoursData && await addDoc(collection(db, "accounts", userId, 'hours'), hoursData);
        console.log("Document written with ID: ", weekId);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}