import React from 'react';
import {  Stack, Sheet, Table, ButtonGroup } from '@mui/joy';
import Checkbox from '@mui/material/Checkbox';

export default function GenericTable({ data, heads, children, selected, handleChange, selectBy }) {

    return <Stack sx={{ p: 1, margin: "auto" }} width={"max-content"}>
        <ButtonGroup direction={"row"} variant="soft" sx={{ '--ButtonGroup-radius': '0px' }}  >
            {children}
        </ButtonGroup >
        <Sheet sx={{ justifySelf: "center", height: "60vh", overflow: "auto", margin: "auto", maxWidth: "90vw", width: "max-content", minWidth: "60vw" }} >

            <Table
                aria-label="table with sticky header"
                stickyHeader
                stickyFooter
                stripe="odd"
                hoverRow
                size='small'
                sx={{
                    margin: "auto", maxHeight: "50vh", overflow: "auto", maxWidth: "90vh", width: "max-content", minWidth: "60vw",
                    '& td, th': { p: 1 },
                    '& th': { textAlign: 'right', background: "blue", color: "white" }
                }}>
                <thead >
                    <tr>
                        <th><Checkbox style={{ color: "white" }} color='primary' /></th>
                        {heads?.map(head => <th key={Math.random()}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row) => {
                        return <tr key={Math.random()}>
                            <td><Checkbox
                                name={selectBy ? ""+row[selectBy] : ""+Object.values(row)[0]}
                                color='primary'
                                onChange={handleChange}
                              checked={selected?.includes(selectBy ? ""+row[selectBy] : ""+ Object.values(row)[0])}
                            /> </td>
                            {Object.values(row).map(cell => {
                                return <td key={Math.random()} >{cell}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </Table>
        </Sheet >
    </Stack>
};
