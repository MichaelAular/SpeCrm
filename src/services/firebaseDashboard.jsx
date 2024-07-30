import { db } from '@/firebase';
import { getDocs, query, where, collection } from "firebase/firestore";
import dayjs from "dayjs";
require('dayjs/locale/nl')

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

const fetchAndProcessAccounts = async (year, month, accountFilter = null) => {
    try {
        const accountsQuerySnapshot = await getDocs(collection(db, 'accounts'));
        let accounts = accountsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (accountFilter !== 'All') {
            accounts = accounts.filter(account => account.id === accountFilter);
        }

        const accountsWithHoursPromises = accounts.map(async (account) => {
            const hoursQuerySnapshot = await getDocs(collection(db, `accounts/${account.id}/hours`));
            const hours = hoursQuerySnapshot.docs.map(doc => doc.data()).filter(hour => {
                const date = dayjs.unix(hour.date.seconds);
                return date.year() === year && date.month() === month - 1;
            });
            return { ...account, hours };
        });

        const accountsWithHours = await Promise.all(accountsWithHoursPromises);
        return accountsWithHours;
    } catch (error) {
        console.error("Error fetching accounts and hours:", error);
        return [];
    }
};

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
    var registrationPurposeCounts = countOccurrences(profiles, 'registrationPurpose');

    const splittedValues = {};
    Object.entries(registrationPurposeCounts).forEach(([key, value]) => {
        const keys = key.split(',');
        keys.forEach(subKey => {
            if (splittedValues[subKey]) {
                splittedValues[subKey] += value;
            } else {
                splittedValues[subKey] = value;
            }
        });
    });
    registrationPurposeCounts = splittedValues

    return Object.entries(registrationPurposeCounts).map(([registrationPurpose, count]) => ({
        registrationPurpose,
        count,
    }));
}

const calculateDuration = (startTime, endTime) => {
    return dayjs(`1970-01-01T${endTime}:00`).diff(dayjs(`1970-01-01T${startTime}:00`), "hour", true);
};

const groupByField = (data, field) => {
    return data.reduce((acc, curr) => {
        const fieldValue = curr[field];
        const { startTime, endTime } = curr;
        if (startTime && endTime) {
            const duration = calculateDuration(startTime, endTime);
            if (!acc[fieldValue]) {
                acc[fieldValue] = 0;
            }
            acc[fieldValue] += duration;
        }
        return acc;
    }, {});
};

const formatResult = (groupedData) => {
    const totalHours = Object.values(groupedData).reduce((sum, hours) => sum + hours, 0);
    const formattedData = Object.entries(groupedData).map(([key, hours]) => ({
        [key]: key,
        "count": `${hours} uur (${((hours / totalHours) * 100).toFixed(0)}%)`
    }));
    formattedData.push({
        key: 'Totaal',
        count: `${totalHours} uur (100%)`
    });
    return formattedData;
};

export const getRegisteredHoursPerProject = (accounts) => {
    const allHours = accounts.flatMap(account => account.hours || []);
    const projectHours = groupByField(allHours, 'project');
    return formatResult(projectHours);
}

export const getRegisteredHoursPerProduct = (accounts) => {
    const allHours = accounts.flatMap(account => account.hours || []);
    const productHours = groupByField(allHours, 'product');
    return formatResult(productHours);
}

export const getRegisteredHoursPerActivity = (accounts) => {
    const allHours = accounts.flatMap(account => account.hours || []);
    const activityHours = groupByField(allHours, 'activity');
    return formatResult(activityHours);
}

// Fetch profiles once and process for each function
export const generateDashboardData = async (year, month, accountFilter = null) => {
    const profiles = await fetchAndProcessProfiles();
    const accounts = await fetchAndProcessAccounts(year, month, accountFilter);

    return {
        profileCount: getProfileCount(profiles),
        cityPassCount: getCityPassCount(profiles),
        benefitsCount: getBenefitsCount(profiles),
        specialEducationCount: getSpecialEducationCount(profiles),
        wijkenCounts: getWijkenFromProfiles(profiles),
        schoolTypeCounts: getSchoolTypeCounts(profiles),
        registrationPurposeCounts: getRegistrationPurposeFromProfiles(profiles),
        hoursPerProject: getRegisteredHoursPerProject(accounts),
        hoursPerProduct: getRegisteredHoursPerProduct(accounts),
        hoursPerActivity: getRegisteredHoursPerActivity(accounts)
    };
}
