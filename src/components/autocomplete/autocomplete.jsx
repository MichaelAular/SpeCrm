import "./autocomplete.scss";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

export function AutoComplete({
  fs,
  fullOptions,
  input,
  label,
  multi,
  options,
  profileID,
  setCurrentPage,
  setCurrentTab,
  setProfileID,
  type,
  required
}) {
  const [value, setValue] = useState(input);
  const [inputValue, setInputValue] = useState("");

  // console.log("input:", input);

  const handleChange = (newValue) => {
    setValue(newValue);
    type === "header" && setCurrentPage("Student");
    type === "header" && setCurrentTab("Profielschets");
    type === "header" && fullOptions.map((option) => {
      option.label === newValue && setProfileID(option.id);
    });
  };

  useEffect(() => {
    profileID !== null && fullOptions !== undefined && useEffectChange()
    profileID === null && setValue(null)
  }, [profileID]);

  const useEffectChange = () => {
    const matchingOption = fullOptions.find(option => option.id === profileID);
    handleChange(matchingOption ? matchingOption.label : "Nieuwe leerling"); 
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => handleChange(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={options}
      freeSolo={fs}
      multiple={multi}
      disableClearable
      required={required}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option}
          style={{
            fontSize: "14px",
            padding: "3px 20px 3px 20px",
          }}
        >
          {option}
        </li>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} key={uuidv4()} label={option} />
        ))}
      renderInput={(params) => (
        <TextField
          {...params}
          label={profileID === null && `geef ${label} in`}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: label === "student" && "rgb(var(--secundair))",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { border: "none" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            minWidth: "300px",
            borderRadius: "3px",
            backgroundColor:
              type === "header" && profileID === null
                ? "rgb(var(--TextOnWhite))"
                : type === "header" &&
                  profileID !== null &&
                  "rgb(var(--white07))",
          }}
        />
      )}
    />
  );
}
