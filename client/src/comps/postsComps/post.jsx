
import { useState } from 'react';
import Message from './message';
import { Input, Textarea, Typography } from '@mui/joy';

function contentSlice(content, extend) {
    return !extend && content.length > 100 ? content.slice(0, 100) + '...' : content;
}

export default function Post({ post, handlePosts }) {
    const [mode, setMode] = useState('view');
    const [input, setInput] = useState({...post});
    handlePosts.handleEdit = (e) => {
        e.stopPropagation();
        if(mode === 'edit'){
            handlePosts.save(input, post.post_id);
        }
        setMode(mode === 'edit' ?  'view' : 'edit' );
    }
    const handleChanges = (e) => {
        e.stopPropagation();
        setInput({...input, [e.target.name]: e.target.value});
    }


    return <>
        <Message {...{message: post, handleMessage: handlePosts}}>
            {mode === 'edit' ? <Input fullWidth onClick={(e => e.stopPropagation())} value={input.title} name='title' onChange={handleChanges} /> :
            <Typography  level='title-md'>{post.title}</Typography>}
            <Typography level='body-sm'>{post.username}</Typography>
            {mode === 'edit'? <Textarea onClick={(e => e.stopPropagation())} value={input.content} name='content' onChange={handleChanges} /> :
             <Typography level='body-sm'>{contentSlice(post.content, handlePosts.extend)}</Typography>}
        </Message>
    </>
}