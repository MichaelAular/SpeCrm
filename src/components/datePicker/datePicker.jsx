import "./datePicker.scss";
import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function Datepicker({ input, name, required }) {

  try {
    input = input.toDate();
  } catch  {}

  const [startDate, setStartDate] = useState(new Date(input));

  if (dayjs(new Date()).format("DD-MM-YYYY") === dayjs(startDate).format("DD-MM-YYYY")) {
    setStartDate("")
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      className="datePicker"
      defaultValue={dayjs(startDate)}
      name={name}
      format="DD-MM-YYYY"
      placeholder="lol"
      />
    </LocalizationProvider>
  );
}
