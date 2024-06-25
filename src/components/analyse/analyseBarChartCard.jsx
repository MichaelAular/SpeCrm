import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BarChart } from '@mui/x-charts/BarChart';

const processDataset = (dataset) => {
    return dataset.map(element => {
        const label = element[Object.keys(element)[0]].trim();
        return {
            ...element,
            trimedLabel: label.length > 50 ? `${label.substring(0, 47)}...` : label
        };
    });
};

const chartSetting = {
    
};

export function BarChartCard({
    title,
    headers,
    dataset
}) {
    const processedDataset = processDataset(dataset);

    return (
        <TableContainer component={Paper}>
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
                                <BarChart
                                    margin={{ left: 320 }}
                                    dataset={processedDataset}
                                    yAxis={[{
                                        scaleType: 'band',
                                        dataKey: 'trimedLabel',
                                        valueFormatter: (trimedLabel, context) => 
                                            context.location === 'tick'
                                                ? trimedLabel
                                                : processedDataset.find((d) => d.trimedLabel === trimedLabel)?.registrationPurpose,
                                    }]}
                                    series={[{ dataKey: 'count' }]}
                                    layout="horizontal"
                                    xAxis={[
                                        {
                                            label: 'Aantal leerlingen',
                                            tickMinStep: 1,
                                        },
                                    ]}
                                    height={ "400" }
                                />
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
