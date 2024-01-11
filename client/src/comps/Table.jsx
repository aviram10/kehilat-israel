import React from 'react';
import { Button, Sheet, Table } from '@mui/joy';

export default function GenericTable({ data, heads, children, handle }) {

    const [editMode, setEditMode] = React.useState(false);
    return <>
        <Sheet sx={{ height: "fit-content", overflow: 'auto' }}>
            <Table
                aria-label="table with sticky header"
                stickyHeader
                stickyFooter
                stripe="odd"
                hoverRow
                size='small'
                sx={{ margin: "auto", maxWidth: "90vw", width: "max-content", minWidth: "60vw", '& td, th': { p: 1, m: 1 }, '& th': { textAlign: 'right', backgroundColor: 'black', color: 'white' } }}
            >
                <thead >
                    <tr >
                        {heads?.map(head => <th key={Math.random()}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row) => {
                        return <tr key={Math.random()}>
                            {Object.values(row).map((cell) => <td key={Math.random()} >{cell}</td>)}
                            <td>
                                {children && React.Children.map(children, (child) =>React.cloneElement(child, { onClick: (e) => handle(e, row) }))}
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Sheet >
    </>
};
