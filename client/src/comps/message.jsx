import React from 'react';
import { Accordion, Divider, Typography } from '@mui/joy';
import '../styles/message.css';
import CommentForm from './commentForm';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import MessageCard from './messageCard';
import axios from 'axios';
import { url } from '../config/server';

async function getComments(message_id, setComments) {
    const { data } = await axios.get(url + `/messages/${message_id}`);
    setComments(data.comments);
}


export default function Message({ message }) {
    const [comments, setComments] = React.useState([]);
    return <>
        <Accordion
            onChange={() =>getComments(message.message_id, setComments)}
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
                <MessageCard likes={message.likes}  >
                    <Typography level='title-lg'>{message.title}</Typography>
                    <Typography level='body-md'>{message.content}</Typography>
                </MessageCard>
            </AccordionSummary>
            <AccordionDetails variant='soft' color="primary" >
               
            <div className="comment">  
              {comments && comments.map((comment, i) =><div key={comment.comment_id}><MessageCard likes={comment.likes}  >
                    <Typography level='body-md'>{comment.comment}</Typography>
                </MessageCard>  
                <Divider/> </div>)}
              </div>  
                <CommentForm sx={{m:1}} />
            </AccordionDetails>
        </Accordion>


    </>
}



