import { useState } from 'react';
import { Accordion } from '@mui/joy';
import '../../styles/message.css';
import CommentForm from './commentForm';
import AccordionDetails, { accordionDetailsClasses } from '@mui/joy/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import axios from 'axios';
import { url } from '../../config/server';
import Post from './post';
import Comment from './comment';

async function getComments(post_id, setComments) {
    const { data } = await axios.get(url + `/posts/${post_id}`);
    setComments(data.comments);
}

export default function ExtebdPost({ post, handlePosts }) {
    const [comments, setComments] = useState([]);
    const [extend, setExtend] = useState(false);

    const handleChange = () => {
        getComments(post.post_id, setComments)
        setExtend(!extend);
    }
    handlePosts.extend = extend;

    return <>
        <Accordion
            onChange={handleChange}
            sx={{
                borderRadius: 'lg',
                [`& .${accordionSummaryClasses.button}:hover`]: {
                    bgcolor: 'transparent',
                },
                [`& .${accordionDetailsClasses.content}`]: {
                    boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                    [`&.${accordionDetailsClasses.expanded}`]: {
                        paddingBlock: '0.75rem',
                    },
                },
            }}
        >
            <AccordionSummary color='neutral'>
                <Post {...{ post, handlePosts }} />
            </AccordionSummary>
            <AccordionDetails variant='soft' color="primary" >
                <div className="comment">
                    {comments.map((comment) => <Comment key={comment.comment_id} comment={comment}/>)}
                </div>
                <CommentForm sx={{ m: 1 }} />

            </AccordionDetails>
        </Accordion>


    </>
}



