export function useOverwriteCurrentProfile(
    currentProfile,
    formJson,
    ) {
    let newJson = {};

    Object.entries(formJson).map(([key, val]) => {
        const nest = key.split(".");
        if (nest[1]) { newJson[nest[0]] = {...newJson[nest[0]], ...{}} };
        if (nest[2]) { newJson[nest[0]][nest[1]] = {...newJson[nest[0]][nest[1]], ...{}} };
        if (nest[3]) { newJson[nest[0]][nest[1]][nest[2]] = {...newJson[nest[0]][nest[1]][nest[2]], ...{}} };
        if (nest[0]) {
            if (!nest[1] && !nest[2] && !nest[3]) {
                newJson[nest[0]] = val
            };
            if (nest[1] && !nest[2] && !nest[3]) {
                const path = newJson[nest[0]];
                path[nest[1]] = val;
            };
            if (nest[1] && nest[2] && !nest[3]) {
                newJson[nest[0]][nest[1]][nest[2]] = val;
            };
            if (nest[1] && !nest[2] && nest[3]) {
                newJson[nest[0]][nest[1]][nest[2]][nest[3]] = val;
            };
        };
  });

  console.log("newJson:", newJson);
}
