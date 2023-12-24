import React from "react";
import { AccordionGroup } from "@mui/joy";
import ExtebdPost from "./extendPost";
   

export default function Posts({handlePosts, posts}) {
    return <>
        <AccordionGroup variant="outlined">
           {posts && posts.map(post =>
            <ExtebdPost key={post.post_id} { ...{post, handlePosts} } />)}
        </AccordionGroup>
    </>
};
