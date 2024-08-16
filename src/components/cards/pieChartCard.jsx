import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PieChart } from '@mui/x-charts/PieChart';

export function PieChartCard({
    title,
    headers,
    series
}) {
    const theme = useTheme();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={headers?.length}>{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <PieChart
                                series={series}
                                height={300}
                                margin={{ top: 50, bottom: 75, left: 50, right: 50 }}
                                slotProps={{
                                    legend: {
                                      direction: useMediaQuery(theme.breakpoints.down("md")) ? 'row' : 'column',
                                      position: { vertical: useMediaQuery(theme.breakpoints.down("md")) ? 'bottom' : 'middle', horizontal: useMediaQuery(theme.breakpoints.down("md")) ? 'middle' : 'right' },
                                      padding: 0,
                                    },
                                  }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
