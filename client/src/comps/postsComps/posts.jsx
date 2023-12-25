import React from "react";
import { AccordionGroup } from "@mui/joy";
import ExtendPost from "./extendPost";
   

export default function Posts({handlePosts, posts}) {
    return <>
        <AccordionGroup variant="outlined">
           {posts && posts.map(post =>
            <ExtendPost key={post.post_id} { ...{post, handlePosts} } />)}
        </AccordionGroup>
    </>
};
