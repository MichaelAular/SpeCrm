import React, { useState } from "react";
import { ArrowUpIcon } from "@/assets/icons/arrowUp";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
require('dayjs/locale/nl')

export function UrenRegistratie({ urenRegistratie }) {
  const [incidentOpen, setIncidentOpen] = useState(false);

  urenRegistratie = urenRegistratie.urenRegistraties
  const totalWeekHours = () => {
    let totalHours = 0;
    urenRegistratie.forEach(registration => {
      totalHours += dayjs(registration.endTime, "HH:mm").diff(dayjs(registration.startTime, "HH:mm"), "hour", true);
    });
    return totalHours ? `(${totalHours} uur)` : "";
  };
  
  const dateObj = dayjs(urenRegistratie[0].date).locale("nl");

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: "lightgrey",
    },
  }));

  return (
    <div className="evaluatieContainer" style={{ height: incidentOpen ? "auto" : "28px", overflow: incidentOpen ? "visible" : "hidden", }}>
      <div className="evaluatieHeader" onClick={() => { setIncidentOpen(!incidentOpen) }}>
        <h6>
          {dateObj.format('dddd DD-MM-YYYY')} {totalWeekHours()} {<span id={"unsavedChanges"} style={{color: "darkred"}}></span>}
        </h6>
        <div className="evaluatieButtonContainer">
          <button className="titlebarButton" style={{ transform: incidentOpen && `rotate(180deg) translateY(6px)` }}>
            <ArrowUpIcon className="arrowUpIcon" size="16" />
          </button>
        </div>
      </div>
      {incidentOpen && (
        <div className="evaluatie_BarContainer" style={{marginTop: 0}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {urenRegistratie.map((registration) => (
                  !registration.isNotSet &&
                  <StyledTableRow  key={uuidv4()}>
                    <TableCell>
                      <div style={{ fontSize: "large", fontWeight: "bold" }}>{registration.project} - {registration.product} - {registration.activity}</div>
                      <div style={{ fontSize: "medium" }}>{registration.startTime} - {registration.endTime} ({dayjs(registration.endTime, "HH:mm").diff(dayjs(registration.startTime, "HH:mm"), "hour", true)} uur)</div>
                      <div style={{ fontSize: "medium" }}>{registration.description}</div>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
