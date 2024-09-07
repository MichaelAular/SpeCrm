import "./table.scss";
import React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';


export function BasicTable({
  profiles,
  setCurrentPage,
  setCurrentTab,
  setProfileID,
}) {
  const columns = [
    { field: 'firstName', headerName: 'Voornaam', flex: 1, minWidth: 150 },
    { field: 'lastName', headerName: 'Achternaam', flex: 1, minWidth: 150 },
    { 
      field: 'birthDate', 
      headerName: 'Geboortedatum', 
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => {
        const newDate = (value.toDate()).toDateString();
        const splitDate = newDate.split(" ");
        return splitDate[2] +" "+ splitDate[1] +" "+ splitDate[3];
      } 
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  const handleRowClick = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    setProfileID(params.id);
    setCurrentPage("Student");
    setCurrentTab("Profielschets");
  };
  const rows = profiles.list;

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 25, 50]}
        onRowClick={handleRowClick}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
