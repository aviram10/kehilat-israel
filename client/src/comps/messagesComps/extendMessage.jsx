import React from 'react';
import { Accordion, Typography } from '@mui/joy';
import '../../styles/message.css';
import CommentForm from './commentForm';
import AccordionDetails, { accordionDetailsClasses } from '@mui/joy/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import axios from 'axios';
import { url } from '../../config/server';
import Message from './message';

async function getComments(message_id, setComments) {
    const { data } = await axios.get(url + `/messages/${message_id}`);
    console.log(data);
    setComments(data.comments);
}


export default function ExtendMessage({ message, handleMessage }) {
    const [comments, setComments] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        getComments(message.message_id, setComments)
        setExpanded(!expanded);
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
                <Message params = {{handleMessage, message}}  >
                    <Typography level='title-lg'>{message.title}</Typography>
                    <Typography level='body-md'>{expanded || message.content.length < 100 ? message.content : message.content.slice(0, 100) + "..."}</Typography>
                </Message>
            </AccordionSummary>
            <AccordionDetails variant='soft' color="primary" >
                <div className="comment">
                    {comments.map((comment) => 
                    <Message  key={comment.comment_id} params={{message: comment}}  >
                        <Typography level='body-md'>{comment.comment}</Typography>
                        
                    </Message>  

                   )}
                </div>
                <CommentForm sx={{ m: 1 }} />
               
            </AccordionDetails>
        </Accordion>


    </>
}



