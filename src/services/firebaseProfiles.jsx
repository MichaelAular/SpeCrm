import { db } from '@/firebase';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

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
        const docRef = doc(db, "profiles")
        const id = docRef.id;
        data.id = id;
        updateProfileList(data);
        doc(db, "profiles", id)
        await setDoc(docRef, data);
        console.log("Document written with ID: ", docRef.id);
    } catch (data) {
        console.error("Error adding document: ", data);
    }
}

// Update excisting profile to Firestore Database
export const updateProfile = async (data) => {
    await updateProfileList(data);
    try {
        const profileRef = doc(db, 'profiles', data.id);
        console.log(data, profileRef);
        const docRef = await updateDoc(profileRef, data);
        //console.log("Document updated with ID: ", docRef.id);
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
        let filter = profileList.list.filter(u => ![profile.id].includes(u.id));
        filter.push(item);
        profileList.list = filter;
        // Sort alphabetically by firstName
        profileList.list.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
        console.log(profileList)
        await updateDoc(doc(db, 'profiles', 'All'), profileList);
        return item;
    } catch (data) {
        console.error("Error updating document: ", data);
        return null;
    }
}