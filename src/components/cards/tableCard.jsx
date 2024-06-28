import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


export function TableCard({
    title,
    headers,
    value
}) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={value && Object.keys(value).length}>{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {headers && headers.map((header, index) => (
                            <TableCell className="tableHeader" key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                    {value && value.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            { Object.keys(row).map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    {row[Object.keys(row)[cellIndex]]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
