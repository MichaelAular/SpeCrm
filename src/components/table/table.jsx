import "./table.scss";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { AddIcon } from "@/assets/icons/add";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleFirstPageButtonClick = (event) => { onPageChange(event, 0) };
  const handleBackButtonClick = (event) => { onPageChange(event, page - 1) };
  const handleNextButtonClick = (event) => { onPageChange(event, page + 1) };
  const handleLastPageButtonClick = (event) => { onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1)) };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export function BasicTable({
  profiles,
  setCurrentPage,
  setCurrentTab,
  setProfileID,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const createData = (id, firstName, lastName, birthDate) => {
    return { id, firstName, lastName, birthDate };
  };
  const rows = () => {
    let rowArray = [];
    profiles.list.map((student) => {
      const newDate = (student.birthDate.toDate()).toDateString();
      const splitDate = newDate.split(" ");
      const birthDate = splitDate[2] +" "+ splitDate[1] +" "+ splitDate[3];
      rowArray.push( createData(student.id, student.firstName, student.lastName, birthDate ));
    });
    return rowArray;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: "Calc(100vw - 4rem)",
          maxWidth: "800px",
        }}
        aria-label="custom pagination table"
      >
        <TableHead>
            <TableRow>
              <TableCell>Voornaam</TableCell>
              <TableCell>Achternaam</TableCell>
              <TableCell>Geboortedatum</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
            console.log
            return (
            <TableRow
              key={row.id}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setProfileID(row.id);
                setCurrentPage("Student");
                setCurrentTab("Profielschets");
              }}
            >
              <TableCell >{row.firstName}</TableCell>
              <TableCell >{row.lastName}</TableCell>
              <TableCell >{row.birthDate}</TableCell>
            </TableRow>
          )}
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <button
                className="headerBtn prevent-select"
                onClick={() => {
                  setProfileID("new_user");
                  setCurrentPage("Student");
                  setCurrentTab("Profielschets");
                }}
              >
                <AddIcon
                  color={"--white07"}
                  size="18"
                />
                <span style={{ color: "black", padding: "0 10px"}}>leerling toevoegen</span>
              </button>
            </TableCell>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
