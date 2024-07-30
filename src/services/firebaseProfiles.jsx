import { db } from '@/firebase';
import { doc, addDoc, query, where, limit, get, getDoc, getDocs, updateDoc, collection } from "firebase/firestore";
import axios from 'axios';

// Get profile name list from Firestore Database
export const fetchProfileNameList = async () => {
  return getDoc(doc(db, 'profiles', 'All'));
}

// Get specific profile from Firestore Database by id
export const getProfile = (profileId) => {
    const profileDocRef = query(collection(db, 'profiles'), where('id', '==', profileId), where('active', '==', 1), limit(1));
    return getDocs(profileDocRef);
};

// Add new profile to Firestore Database
export const addProfile = async (data) => {
    try {
        try {
            const response = await axios.get(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${data.address.postalCode} ${data.address.streetNo} ${data.address.city}&fl=wijknaam,buurtnaam&fq=type:(adres)&rows=1&wt=json`);
            const buurt = response.data.response.docs[0]?.buurtnaam;
            const wijk = response.data.response.docs[0]?.wijknaam;
            data.address.buurt = buurt
            data.address.wijk = wijk
        } catch (apiError) {
            console.error(`Error fetching wijk:`, apiError);
        }
        data.active = 1;
        data.registrationDate = new Date();
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
        try {
            const response = await axios.get(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${data.address.postalCode} ${data.address.streetNo} ${data.address.city}&fl=wijknaam,buurtnaam&fq=type:(adres)&rows=1&wt=json`);
            const buurt = response.data.response.docs[0]?.buurtnaam;
            const wijk = response.data.response.docs[0]?.wijknaam;
            data.address.buurt = buurt
            data.address.wijk = wijk
        } catch (apiError) {
            console.error(`Error fetching wijk:`, apiError);
        }
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
        birthDate: profile.birthDate,
        active: profile.active
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
        return item;
    } catch (data) {
        console.error("Error updating document: ", data);
        return null;
    }
}