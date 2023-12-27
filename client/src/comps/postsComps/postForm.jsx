import React from 'react';
import { Grid, Input, Textarea, Button } from '@mui/joy';




export default function PostForm({ handleSubmit }) {
    const [input, setInput] = React.useState({ title: '', category: '', content: '' });
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    return <>

        <Grid sx={{m:2}} container spacing={1}>
            <Grid xs={12} sm={6} >
                <Input name='category' onChange={handleChange} placeholder="נושא" value={input.category} required />
            </Grid>
            <Grid xs={12} sm={6} >
                <Input name='title' onChange={handleChange} placeholder="כותרת" value={input.title} required />
            </Grid>
            <Grid xs={12}>
                <Textarea name='content' onChange={handleChange} minRows={2} value={input.content} placeholder="תוכן" />

            </Grid>
            <Button fullWidth type="submit" onClick={() => { handleSubmit(input).then(() => setInput({ title: '', category: '', content: '' })) }}  >פרסם</Button>
        </Grid>

    </>
};
