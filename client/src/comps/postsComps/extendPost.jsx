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
import { postComment, toggleLike } from '../../functions/server'


async function getComments(post_id, setComments) {
    const { data } = await axios.get(url + `/posts/${post_id}`, { withCredentials: true });
    setComments(data.comments);
}

export default function ExtendPost({ post, handlePosts }) {
    const [comments, setComments] = useState([]);
    const [extend, setExtend] = useState(false);
     // to handle the amount of text in the post
    handlePosts.extend = extend;

    const handleChange = () => {
        getComments(post.post_id, setComments)
        setExtend(!extend);
    }
   
    const handleComment = {
        addComment: async  comment =>{
            const newComment = await postComment(comment, post.post_id);
            console.log(newComment);
            setComments([...comments, newComment]);
        },
        toggleLike: async comment_id =>{
            try{
             toggleLike(comment_id, "comments")
            .then(data =>{
                setComments(prev => prev.map(comment => comment.comment_id === comment_id ? {...comment, ...data} : comment))
            })

            
            }catch(err){
                console.log(err);
            }
            
        }
    }


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
                    {comments.map((comment) => <Comment key={comment.comment_id} handleComment={handleComment} comment={comment} />)}
                </div>
                <CommentForm  handleComment={handleComment} sx={{ m: 1 }} />

            </AccordionDetails>
        </Accordion>


    </>
}



