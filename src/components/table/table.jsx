import "./table.scss";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

export function BasicTable({
  profiles,
  setCurrentPage,
  setCurrentTab,
  setProfileID,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  4;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const createData = (bsn, firstName, lastName) => {
    return { bsn, firstName, lastName };
  };
  const rows = () => {
    let rowArray = [];
    profiles.list.map((student) => {
      rowArray.push(
        createData(student.id, student.firstName, student.lastName)
      );
    });
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
        onClick={() => {
          setProfileID(row.bsn);
          setCurrentPage("Analyse");
          setCurrentTab("Profielschets");
        }}
      >
        <TableCell align="left">{row.bsn}</TableCell>
        <TableCell align="right">{row.firstName}</TableCell>
        <TableCell align="right">{row.lastName}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
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

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
