import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { UserContext } from '../../App'



export default function CommentForm({ handleComment }) {

  const [comment, setComment] = React.useState('');
  const [user, setUser] = React.useContext(UserContext);

  return (
    <FormControl sx={{ width: "80%", margin: "auto" }}>

      <Textarea
        value={comment}
        disabled={!user?.user_id}
        onChange={(event) => setComment(event.target.value)}
        placeholder=" תגובה..."
        minRows={2}
        endDecorator={
          <Box
            sx={{
              margin: "auto",
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
              justifyContent: 'end',
            }}
          >
            <Button 
              color={user?.user_id ? 'primary' : 'neutral'} 
              variant={user?.user_id ? 'solid' : 'soft'} 
              onClick={() => handleComment.addComment(comment)} 
              sx={{justifySelf:'center', alignSelf:'center'} }>שלח</Button>
          </Box>
        }
        sx={{
          minWidth: 300,
        }}
      />
    </FormControl>
  );
}
