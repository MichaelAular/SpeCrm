import "./datePicker.scss";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function Datepicker({ input, name, required }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      className="datePicker"
      defaultValue={dayjs(input)}
      name={name}
      format="DD-MM-YYYY"
      required={required}
      />
    </LocalizationProvider>
  );
}
