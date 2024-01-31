import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { Chip }  from "@mui/material";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from "uuid";

export function AutoComplete({ options, input }) {
  const [value, setValue] = useState(input);
  const [inputValue, setInputValue] = useState("");

  return (
    <Stack sx={{ width: "auto", marginLeft: "12px", marginRight: "6px" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        multiple
        freeSolo
        disableClearable
        options={options}
        renderInput={(params) => {
          return <TextField {...params} />;
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option}>
              {option}
            </li>
          );
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })} key={uuidv4()} label={option} />
          ));
        }}
      />
    </Stack>
  );
}