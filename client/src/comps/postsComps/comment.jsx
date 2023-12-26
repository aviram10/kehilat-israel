import React from 'react';
import Message from './message';
import { Typography } from '@mui/joy';

export default function Comment({  comment, handleComment}) {
  const handleMessage = {edit: false, ...handleComment}
    return <>
        <Message {...{message: comment, handleMessage} }  >
          <Typography level='body-md'>{comment.content}</Typography>
        </Message>
    </>
};
