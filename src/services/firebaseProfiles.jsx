import { db } from '@/firebase';
import { doc, addDoc, getDoc, updateDoc, collection } from "firebase/firestore";

// Get profile name list from Firestore Database
export const fetchProfileNameList = async () => {
  return getDoc(doc(db, 'profiles', 'All'));
}

// Get specific profile from Firestore Database by id
export const getProfile = (profileId) => {
    const profileDocRef = doc(db, 'profiles', profileId);
    return getDoc(profileDocRef);
};

// Add new profile to Firestore Database
export const addProfile = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "profiles"), data);
        console.log("Document written with ID: ", docRef.id);
        data.id = docRef.id;
        await updateDoc(docRef, data);
        updateProfileList(data);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}

// Update existing profile to Firestore Database
export const updateProfile = async (data) => {
    try {
        const profileRef = doc(db, 'profiles', data.id);
        console.log(data, profileRef);
        await updateDoc(profileRef, data);
        updateProfileList(data);
    } catch (data) {
        console.error("Error updating document: ", data);
    }
}

// Update profile name list to Firestore Database
export const updateProfileList = async (profile) => {
    const item = {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate
    }
    const profileListDoc = await getDoc(doc(db, 'profiles', 'All'));
    try {
        const profileList = profileListDoc.data();
        const i = profileList.list.findIndex(e => e.id === profile.id);
        if (i > -1) {
            profileList.list[i] = item;
        } else {
            profileList.list.push(item);
        }
        // Sort alphabetically by firstName
        profileList.list.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
        console.log(profileList)
        await updateDoc(doc(db, 'profiles', 'All'), profileList);
        //console.log("Document updated with ID: ", docRef.id);
        return item;
    } catch (data) {
        console.error("Error updating document: ", data);
        return null;
    }
}