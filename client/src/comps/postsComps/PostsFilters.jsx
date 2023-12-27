import React from 'react';
import { Autocomplete, Input, Stack } from '@mui/joy';

export default function PostsFilters({ posts, handleFilters }) {

    return <Stack direction={"row"} justifyContent={"space-evenly"} spacing={1} useFlexGap>
        <Input onChange={(e) => handleFilters( "content",e.target.value)}
            placeholder={"חיפוש"} />
        <Autocomplete multiple
            onChange={(e, v) => handleFilters("username",v)}
            placeholder='חבר קהילה'
            options={[...new Set(posts.map(p => p.username))]} />

        <Autocomplete multiple
            onChange={(e, v) => handleFilters("category",v)}
            placeholder='נושא'
            options={[...new Set(posts.map(p => p.category))]} />
     
     
     
        {/* <Select multiple value={value}
            onChange={(e, v) => {handleFilters( "category",v);
            v == "" ? setValue([]): setValue(v)  }}
            sx={{ width: "150px" }}
            placeholder={"נושא"}   >
            {posts &&[ <Option key={"all"} value={""} >{"all"}</Option>,
            ...[...new Set(posts.map(p => p.category))]
            .map(c => <Option key={c} value={c}>{c}</Option>)]}
        </Select> */}

    </Stack>
};
