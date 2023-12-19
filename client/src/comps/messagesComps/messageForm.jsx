import React from 'react';
import { Grid, Input, Textarea, Button } from '@mui/joy';



export default function MessageForm({handleSubmit}) {
    console.log(handleSubmit);
    const [input, setInput] = React.useState({ title: '', category: '', content: '' });
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    
    return<>
    <Grid container spacing={1}>
    <Grid xs={12} sm={6} >
        <Input name='category'  onChange={handleChange} placeholder="נושא" required />
    </Grid>
    <Grid xs={12} sm={6} >
        <Input name='title'  onChange={handleChange} placeholder="כותרת" required />
    </Grid>
    <Grid xs={12}>
        <Textarea name='content'  onChange={handleChange} minRows={2} placeholder="תוכן" />

    </Grid>
    <Button type="submit" onClick={() =>handleSubmit(input)} fullWidth>פרסם</Button>
</Grid>
</>
};
