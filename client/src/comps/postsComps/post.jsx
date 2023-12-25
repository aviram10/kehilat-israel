
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
            console.log(input);
            handlePosts.save(input, post.post_id);
        }
        setMode(mode === 'edit' ?  'view' : 'edit' );
    }

    return <>
        <Message {...{message: post, handleMessage: handlePosts}}>
            {mode === 'edit' ? <Input fullWidth value={input.title} name='title' onChange={({target}) => setInput({...input, [target.name]: target.value})} /> :
            <Typography  level='title-md'>{post.title}</Typography>}
            {mode === 'edit'? <Textarea  value={input.content} name='content' onChange={({target}) => setInput({...input, [target.name]: target.value})} /> :
             <Typography level='body-sm'>{contentSlice(post.content, handlePosts.extend)}</Typography>}
        </Message>
    </>
}