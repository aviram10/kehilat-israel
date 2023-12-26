import React from 'react';
import Card from '@mui/joy/Card';
import { Autocomplete, Select } from '@mui/joy';

export default function PostsFilters(params) {
    return <>
        <Card variant='soft' sx={{ width: "100%", m: 0 }} orientation='horizontal'  >
            <Autocomplete options={[]} />
            <Select sx={{width:"500px"}} /> 
        </Card>
    </>
};
