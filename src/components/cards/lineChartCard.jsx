import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LineChart } from '@mui/x-charts/LineChart';

export function LineChartCard({
    title,
    headers,
    dataset,
    secondDataset
}) {

    return (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={headers && headers.length}>{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {dataset &&
                                <LineChart
                                    dataset={dataset}
                                    yAxis={[{
                                        min: 0,
                                        max: 5,
                                        label: 'Voortgang beoordelingen',
                                    }]}
                                    series={[{
                                        dataKey: 'value',
                                    }]}
                                    xAxis={[
                                        {
                                            dataKey: 'week',
                                            label: 'Week nr.',
                                            tickMinStep: 1,
                                        },
                                    ]}
                                    height={300}
                                    stackingOrder='descending'
                                />
                            }
                            {secondDataset &&
                                <LineChart
                                    dataset={secondDataset}
                                    yAxis={[{
                                        min: 0,
                                        max: 10,
                                        label: 'Toets resultaten',
                                    }]}
                                    series={[{
                                        dataKey: 'value',
                                    }]}
                                    xAxis={[
                                        {
                                            dataKey: 'week',
                                            label: 'Week nr.',
                                            tickMinStep: 1,
                                        },
                                    ]}
                                    height={300}
                                    stackingOrder='descending'
                                />
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
