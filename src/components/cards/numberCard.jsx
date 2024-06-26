import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


export function SingleNumberCard({
    title,
    value
}) {
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>{title}</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>{value}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
