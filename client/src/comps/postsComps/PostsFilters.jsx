import React from 'react';
import { Autocomplete, Input, Option, Select, Stack } from '@mui/joy';

export default function PostsFilters({ posts, handleFilters }) {

    return <Stack direction={"row"} justifyContent={"space-evenly"} spacing={1} useFlexGap>
        <Input onChange={(e) => handleFilters(e, "content")} placeholder={"חיפוש"} />
        <Autocomplete multiple onChange={(e,v) => handleFilters(v, "username")} placeholder='חבר קהילה' options={[...new Set(posts.map(p => p.username))]} />
        <Select multiple onChange={(e, v) => handleFilters(v, "category")} sx={{ width: "150px" }} placeholder={"נושא"}   >
            {posts && [...new Set(posts.map(p => p.category))].map(c => <Option key={c} value={c}>{c}</Option>)}
        </Select>

    </Stack>
};
