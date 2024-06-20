import dayjs from "dayjs";

export function useOverwriteCurrentProfile(
    currentProfile,
    formJson,
    ) {
        const setNestedProperty = (obj, key, value) => {
            const keys = key.split('.');
            let current = obj;
    
            keys.slice(0, -1).forEach((k) => {
                if (!current[k]) {
                    current[k] = {};
                }
                current = current[k];
            });
    
            if (key === "birthDate") {
                value = dayjs(value, "DD-MM-YYYY").toDate();
            }

            if (key.startsWith("incidents") && key.endsWith("date")){
                value = dayjs(value, "DD-MM-YYYY").toDate();
            }

            if (key.startsWith("incidents") && key.endsWith("peopleInvolved")){
                value = JSON.parse(value)
            }

            if (key.startsWith("attentionPoints") && key.endsWith("date")){
                value = dayjs(value, "DD-MM-YYYY").toDate();
            }
    
            current[keys[keys.length - 1]] = value;
        };
    
        Object.entries(formJson).forEach(([key, value]) => {
            if (key !== "age") {
                setNestedProperty(currentProfile, key, value);
            }
        });
        return currentProfile;
};
