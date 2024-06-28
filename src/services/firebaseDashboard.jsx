import { db } from '@/firebase';
import { getDocs, query, where, collection } from "firebase/firestore";

const fetchAndProcessProfiles = async () => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'profiles'), where('active', '==', 1)));
        const profiles = querySnapshot.docs.map(doc => doc.data());
        return profiles;
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return [];
    }
}

const countOccurrences = (profiles, field, subField = null) => {
    const counts = {};
    profiles.forEach((data) => {
        const value = subField ? data[field]?.[subField] : data[field];
        if (value) {
            counts[value] = (counts[value] || 0) + 1;
        }
    });
    return counts;
}

export const getProfileCount = (profiles) => {
    const currentYear = new Date().getFullYear();
    const lastSeptember = new Date(currentYear - 1, 8, 1); // Last September
    let totalCount = 0;
    let beforeLastSeptemberCount = 0;
    let afterLastSeptemberCount = 0;

    profiles.forEach((data) => {
        totalCount++;
        const creationDate = data.registrationDate ? data.registrationDate.toDate() : null;

        if (creationDate) {
            if (creationDate < lastSeptember) {
                beforeLastSeptemberCount++;
            } else {
                afterLastSeptemberCount++;
            }
        }
    });

    return {
        totalCount,
        beforeLastSeptemberCount,
        afterLastSeptemberCount
    };
}

export const getCityPassCount = (profiles) => countOccurrences(profiles, 'cityPass');

export const getBenefitsCount = (profiles) => countOccurrences(profiles, 'family', 'benefits');

export const getSpecialEducationCount = (profiles) => countOccurrences(profiles, 'school', 'specialEducation');


export const getWijkenFromProfiles = (profiles) => {
    const wijkCounts = countOccurrences(profiles, 'address', 'wijk');
    const totalCount = profiles.length;

    return Object.entries(wijkCounts).map(([wijk, count]) => ({
        wijk,
        count: `${count} (${(count / totalCount * 100).toFixed(0)}%)`,
    }));
}

export const getSchoolTypeCounts = (profiles) => {
    const schoolTypeCounts = countOccurrences(profiles, 'school', 'type');
    const totalCount = profiles.length;

    return Object.entries(schoolTypeCounts).map(([schoolType, count]) => ({
        schoolType,
        count: `${count} (${(count / totalCount * 100).toFixed(0)}%)`,
    }));
}

export const getRegistrationPurposeFromProfiles = (profiles) => {
    const registrationPurposeCounts = countOccurrences(profiles, 'registrationPurpose');

    return Object.entries(registrationPurposeCounts).map(([registrationPurpose, count]) => ({
        registrationPurpose,
        count,
    }));
}

// Fetch profiles once and process for each function
export const generateDashboardData = async () => {
    const profiles = await fetchAndProcessProfiles();

    return {
        profileCount: getProfileCount(profiles),
        cityPassCount: getCityPassCount(profiles),
        benefitsCount: getBenefitsCount(profiles),
        specialEducationCount: getSpecialEducationCount(profiles),
        wijkenCounts: getWijkenFromProfiles(profiles),
        schoolTypeCounts: getSchoolTypeCounts(profiles),
        registrationPurposeCounts: getRegistrationPurposeFromProfiles(profiles)
    };
}
