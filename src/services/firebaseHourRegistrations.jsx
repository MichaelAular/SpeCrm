import { db } from '@/firebase';
import { where, getDocs, collection, doc, query, addDoc, deleteDoc } from "firebase/firestore";

// Get specific hour registration week from Firestore Database by profile id and week id
export const getHourRegistrationWeek = async (userId, weekId) => {
    const hourRegistrationsRef = collection(db, 'accounts', userId, 'hours');
    try {
      const querySnapshot = await getDocs(query(hourRegistrationsRef, where('weekId', '==', weekId)));
      const hourRegistrations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return hourRegistrations;
    } catch (error) {
      console.error('Error fetching hour registrations: ', error);
      return [];
    }
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

// Delete hour registration from Firestore Database
export const deleteHourRegistration = async (userId, itemId) => {
  try {
      await deleteDoc(doc(db, "accounts", userId, 'hours', itemId));
      console.log("Document written with ID: ", itemId);
  } catch (data) {
      console.error("Error deleting document: ", data);
  }
}