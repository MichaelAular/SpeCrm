import "./weekpicker.scss";
import React, { useState } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: "rgb(var(--white07))",
    color: "rgb(var(--secundair))",
    fontWeight: "800",
    "&:hover, &:focus": {
        backgroundColor: "rgb(var(--white07))",
        color: "rgb(var(--secundair))",
    },
}),
...(isHovered && {
    backgroundColor: "rgb(var(--secundair))",
    fontWeight: "800",
    color: "rgb(var(--white09))",
    "&:hover, &:focus": {
      backgroundColor: "rgb(var(--secundair_80))",
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) { return false};
  return dayA.isSame(dayB, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export function WeekPicker({value, setValue}) {
  const [hoveredElement, setHoveredElement] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const style={
    position: "relative",
    backgroundColor: "rgb(var(--white04))",
    borderRadius: "5px",
    height: !hoveredElement ? "30px" : "370px",
    width: "340px",
    paddingTop: "0px",
    transitionDuration: ".3s",
    boxShadow: "-5px 5px 7px rgba(var(--TextOnWhite), 0.15)",
    overflow: "hidden"
    }

  return (
    <dir
        className="weekpickerContainer"
        onMouseEnter={()=>{setHoveredElement(true)}}
        onMouseLeave={()=>{setHoveredElement(false)}}
        style={style}
    >
       <span className="currentDate">Week {dayjs(value).week()} {value.$y}</span>
    <LocalizationProvider
        dateAdapter={AdapterDayjs}
        sx={{
            display: "flex",
            flexDirection: "collumn",
            border: "1px solid red",
        }}
    >
      <DateCalendar
        displayWeekNumber
        value={value}
        onChange={(newValue) => setValue(newValue)}
        showDaysOutsideCurrentMonth
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
        }}
      />
    </LocalizationProvider>
    </dir>
  );
}
