import "./table.scss";
import React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { TrashIcon } from "@/assets/icons/trash";

export function FileTable({
  files,
  deletedAction
}) {
  const columns = [
    { field: 'fileName', headerName: 'Naam', flex: 3, minWidth: 250 },
    { 
      field: 'uploadDate', 
      headerName: 'Uploaddatum', 
      flex: 1,
      minWidth: 50,
      valueGetter: (value, row) => {
        const newDate = (value.toDate()).toDateString();
        const splitDate = newDate.split(" ");
        return splitDate[2] +" "+ splitDate[1] +" "+ splitDate[3];
      } 
    },
    { field: 'byteSize', 
      headerName: 'Grootte', 
      flex: 1,
      minWidth: 50,
      valueGetter: (value, row) => {
        return `${(value / (1024*1024)).toFixed(2)} Mb`;
      } 
    },
    { 
      field: 'fileLocation', 
      headerName: 'Acties', 
      flex: 2,
      minWidth: 150,
      renderCell: (params) => {
        //console.log(params)
        function openLink() {window.open(params.value, "_blank");}
        function deleteFile() {deletedAction(params.id)}
        return (<Grid container spacing={4}>
                <Grid item xs={6}>
                <button target="_blank" onClick={openLink} className="urenRegistratieSaveBtn">Open bestand</button>
                </Grid>
                <Grid item xs={6}>
                  <button target="_blank" onClick={deleteFile} className="urenRegistratieSaveBtn"><TrashIcon color="--white07" size="12"/></button>
                </Grid>
              </Grid>);
      }
    },
  ];
  const paginationModel = { page: 0, pageSize: 25 };
  const rows = files;

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 25, 50]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
