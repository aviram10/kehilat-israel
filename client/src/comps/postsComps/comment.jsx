import React from 'react';
import Message from './message';
import { Typography } from '@mui/joy';

export default function Comment({  comment}) {
  const handleMessage = {edit: false}
    return <>
        <Message {...{message: comment, handleMessage}}  >
          <Typography level='body-md'>{comment.content}</Typography>
        </Message>
    </>
};
