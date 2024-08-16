import "./datePicker.scss";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/nl';

export function Datepicker({ input, name, required, newDate }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl">
      <DatePicker
      className="datePicker"
      defaultValue={dayjs(input)}
      name={name}
      format="DD-MM-YYYY"
      required={required}
      onChange={newDate}
      />
    </LocalizationProvider>
  );
}
