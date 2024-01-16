import React from 'react';
import Message from './message';
import { Divider, Typography } from '@mui/joy';

export default function Comment({  comment, handleComment}) {
  const handleMessage = {edit: false, ...handleComment}
    return <>
        <Message {...{message: comment, handleMessage} } likes={false}  >
          <Typography level='body-sm'>{comment.username}</Typography>
          <Typography level='body-md'>{comment.content}</Typography>
        </Message>
        <Divider />
    </>
};
