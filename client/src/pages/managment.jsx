import React from 'react';
import {  Stack, Typography } from '@mui/joy';
export default function Managment(params) {
    const sx= {m:4, p: 4, textAlign: "center"}
    return <>
        <Stack  direction={"row"} justifyContent={'space-evenly'}>
            <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ תרומות החודש: 10,000 ש"ח</Typography>
            <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ משתמשים חודשיים: 250</Typography>
        </Stack>
    </>
};
