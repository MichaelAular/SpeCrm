import { db } from '@/firebase';
import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { signUp } from "@/app/auth";


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
                name: data.fullName || `${data.firstName} ${data.lastName}`,
                parentOfChildId: data.parentOfChildId
            };
        })
            .filter(account => !account.parentOfChildId);
        return accountNamesAndIds.map(({ id, name }) => ({ id, name }));
    } catch (error) {
        console.error("Error fetching account names and IDs:", error);
        return [];
    }
};

export const createAccount = async (email, password, firstName, lastName, permissions) => {
    console.log(email, password)
    const user = await signUp(email, password);
    if (user != null) {
        const userItem = {
            id: user.uid,
            email: email,
            firstName: firstName,
            lastname: lastName,
            permissions: permissions
        }
        // Save user info to Firestore 
        await setDoc(doc(db, 'accounts', user.uid), userItem);
        return true;
    } else {
        return false;
    }
}