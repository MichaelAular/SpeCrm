import { db } from '@/firebase';
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

// Get specific user from Firestore Database by id
export const getUser = (userId) => {
    const userDocRef = doc(db, 'accounts', userId);
    return getDoc(userDocRef);
};

export const fetchAccountNames = async () => {
    try {
        const accountsQuerySnapshot = await getDocs(collection(db, 'accounts'));
        const accountNamesAndIds = accountsQuerySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.fullName || `${data.firstName} ${data.lastName}`
            };
        });
        return accountNamesAndIds;
    } catch (error) {
        console.error("Error fetching account names and IDs:", error);
        return [];
    }
};