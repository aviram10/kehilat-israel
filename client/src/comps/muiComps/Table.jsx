import React from 'react';
import {   Sheet, Table } from '@mui/joy';
import Checkbox from '@mui/material/Checkbox';

export default function GenericTable({ data, heads, children, handle }) {
    const [selected, setSelected] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);
    return <>
        <Sheet sx={{ height: "50vh", overflow: "auto" }} >
        
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
                        <th><Checkbox style={{color: "white"}} color='primary' /></th>
                        {heads?.map(head => <th key={Math.random()}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
              
                    {data?.map((row) => {
                        return <tr key={Math.random()}>
                            <td><div><Checkbox
                             name={""+Object.values(row)[0]} 
                            color='primary'
                             onChange={({target}) => {console.log(target); setSelected([...selected,target.name])}}
                             checked={selected.includes(""+Object.values(row)[0])}
                              /></div> </td>
                            {Object.values(row).map((cell) => <td key={Math.random()} >{cell}</td>)}
                            {/* <td>
                                {children && React.Children.map(children, (child) =>React.cloneElement(child, { onClick: (e) => handle(e, row) }))}
                            </td> */}
                        </tr>
                    })}
                </tbody>
            </Table>
        </Sheet >
    </>
};
