import "./table.scss";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function BasicTable({
    profiles,
    setCurrentPage,
    setCurrentTab,
    setProfileID,
}) {
  const createData = (bsn, firstName, lastName) => {return { bsn, firstName, lastName }};
  const rows = () => {
    let rowArray = [];
    profiles.list.map((student)=> {
        rowArray.push(createData(student.id, student.firstName, student.lastName))
    })
    return rowArray;
  };
  const TR = (row) => {
    const [hovered, setHovered] = useState(false);
    return (
      <TableRow
        key={row.bsn}
        sx={{
          backgroundColor: hovered && "rgb(var(--white09))",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={()=>{
            setProfileID(row.bsn)
            setCurrentPage("Analyse")
            setCurrentTab("Profielschets")
          }}
      >
        <TableCell align="left">{row.bsn}</TableCell>
        <TableCell align="right">{row.firstName}</TableCell>
        <TableCell align="right">{row.lastName}</TableCell>
      </TableRow>
    );
  };

  return (
    <TableContainer component={Paper} className="prevent-select">
      <Table
        sx={{
          width: "Calc(100vw - 20px)",
          maxWidth: "800px",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">BSN</TableCell>
            <TableCell align="right">Voornaam</TableCell>
            <TableCell align="right">Achternaam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows().map((row) => TR(row))}</TableBody>
      </Table>
    </TableContainer>
  );
}