import React from 'react';
import { Button, Sheet, Table } from '@mui/joy';

export default function GenericTable({ data, heads }) {

    const [editMode, setEditMode] = React.useState(false);


    return <>
        <Sheet sx={{ height: "fit-content",  overflow: 'auto' }}>
            <Table
                aria-label="table with sticky header"
                stickyHeader
                stickyFooter
                stripe="odd"
                hoverRow
                noWrap
                size='small'
                sx={{margin: "auto" ,width: 'max-content', '& td, th': {p:1, m: 1}, '& th': {textAlign: 'center', backgroundColor: 'black', color: 'white'}}}
            >
                <thead v>
                    <tr >
                        {heads?.map((head) => <th key={head}  >{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                  
                        {data?.map((row) =>{
                            return <tr key={row.id}>
                            {Object.values(row).map((cell) => <td key={cell} >{cell}</td>)}
                            <td>
                                <Button variant='outlined' >{editMode ? "שמור" : "ערוך"}</Button>
                                <Button color='danger' variant='outlined' >מחק</Button>
                            </td>
                        </tr>
                        } )}
                  
                </tbody>
               
            </Table>
        </Sheet >
    </>
};
