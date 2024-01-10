import React from 'react';
import { Autocomplete, Input, Stack } from '@mui/joy';

export default function PostsFilters({ posts, handleFilters }) {

    return <Stack direction={"row"} justifyContent={"space-evenly"} spacing={1} useFlexGap>
        <Input onChange={(e) => handleFilters( "content",e)}
            placeholder={"חיפוש"} />
        <Autocomplete multiple
            onChange={(e, v) => handleFilters("username",v)}
            placeholder='חבר קהילה'
            options={[...new Set(posts.map(p => p.username))]} />

        <Autocomplete multiple
            onChange={(e, v) => handleFilters("category",v)}
            placeholder='נושא'
            options={[...new Set(posts.map(p => p.category))]} />
    

    </Stack>
};
