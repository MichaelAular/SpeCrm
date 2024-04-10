import { useDateFormatter } from "./dateformatter";

export function useOverwriteCurrentProfile(
    currentProfile,
    formJson,
    ) {
    let newJson = currentProfile;

    Object.entries(formJson).map(([key, v]) => {
        let val = v;
        if (key === "birthDate")  {
            val = new Date(useDateFormatter(v))
        }

        const nest = key.split(".");
        if (nest[1]) { newJson[nest[0]] = {...newJson[nest[0]], ...{}} };
        if (nest[2]) { newJson[nest[0]][nest[1]] = {...newJson[nest[0]][nest[1]], ...{}} };
        if (nest[3]) { newJson[nest[0]][nest[1]][nest[2]] = {...newJson[nest[0]][nest[1]][nest[2]], ...{}} };
        if (nest[0] && key.charAt(0) != ":") {
            if (!nest[1] && !nest[2] && !nest[3]) { newJson[nest[0]] = val };
            if ( nest[1] && !nest[2] && !nest[3]) { newJson[nest[0]][nest[1]] = val };
            if ( nest[1] &&  nest[2] && !nest[3]) { newJson[nest[0]][nest[1]][nest[2]] = val };
            if ( nest[1] &&  nest[2] &&  nest[3]) { newJson[nest[0]][nest[1]][nest[2]][nest[3]] = val };
        };
    });

    return newJson
};
