import "./timePicker.scss";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export function Timepicker({ input, name, required }) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                className="timePicker"
                label="Selecteer tijd"
                name={name}
                slotProps={{ textField: { required: required } }}
                ampm={false}
                minutesStep={15}
                minTime={dayjs().set('hour', 6)}
                maxTime={dayjs().set('hour', 20)}
            />
        </LocalizationProvider>
    );
}
