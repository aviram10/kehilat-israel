import React, { useEffect } from 'react';
import { Grid, Stack, Sheet, Typography, Input } from '@mui/joy';
import { useState } from 'react';

export default function UserDetailsForm({user, handleUser}) {
    const [input, setInput] = useState(user)
   
    useEffect(()=>{
        handleUser(input)   
    },[input, handleUser])

    useEffect(()=>{
        if(user.user_id === input.user_id) return;
        setInput(user)
    },[user])

    const handleChange = ({target}) => setInput({...input, [target.name]: target.value})

    return (
        <Sheet   variant='soft' color='primary'>
                <Stack >
                    <Typography level='title-lg' textAlign={"center"}>
                        פרטים אישיים
                    </Typography>
                    <Grid container sx={{m: 2}} spacing={2} >
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                שם פרטי
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                          <Input name='first_name' onChange={handleChange} value={input?.first_name} required></Input>
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                שם משפחה
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='last_name' onChange={handleChange} value={input?.last_name} required></Input> 
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                פלאפון
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='phone' onChange={handleChange} value={input?.phone} required></Input>
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                אימייל
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='email' onChange={handleChange} value={input?.email} required></Input> 
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                כתובת
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='address' onChange={handleChange} value={input?.address} required></Input> 
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                עיר
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                         <Input name='address' onChange={handleChange} value={input?.city} required></Input> 
                        </Grid>
                        <Grid xs={2}>
                            <Typography level='body-lg'>
                                מדינה
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                         <Input name='address' onChange={handleChange} value={input?.state || "ישראל"} required></Input> 
                        </Grid>
                    </Grid>
                    
                </Stack>
            </Sheet>
    );
}

