import React, { useEffect } from 'react';
import { Grid, Stack, Sheet, Typography, Input } from '@mui/joy';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../config/server';
import {Button} from '@mui/joy';

export default function UserDetailsForm({userDetail,update = true}) {
    console.log(userDetail);
    const [user, setUser] = useState({ first_name: '', last_name: '', phone: '', email: '', address: '', city: '', state: ''})
    useEffect(() => {
        setUser(userDetail)
    }, [userDetail])

    const handleChange = ({target}) =>{
        setUser({...user,[target.name]: target.value })
    }

    async function handleSubmit(e){
        try{
            const {data} = await axios.put(`${url}/users/${Cookies.get('user_id')}`, user, { withCredentials: true })
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }

    
   
    return (
        <Sheet  variant='soft' color='primary'>
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
                          <Input name='first_name' onChange={handleChange} value={user.first_name} required></Input>
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                שם משפחה
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='last_name' onChange={handleChange} value={user.last_name} required></Input> 
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                פלאפון
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='phone' onChange={handleChange} value={user.phone} required></Input>
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                אימייל
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='email' onChange={handleChange} value={user.email} required></Input> 
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                address
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='address' onChange={handleChange} value={user.address} required></Input> 
                        </Grid>
                        <Grid xs={3}>
                            <Typography level='body-lg'>
                                עיר
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                         <Input name='address' onChange={handleChange} value={user.city} required></Input> 
                        </Grid>
                        <Grid xs={2}>
                            <Typography level='body-lg'>
                                מדינה
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                         <Input name='address' onChange={handleChange} value={user.state || "ישראל"} required></Input> 
                        </Grid>
                    </Grid>
                    {update &&<Button onClick={handleSubmit} fullWidth >עדכן</Button>}
                </Stack>
            </Sheet>
    );
}

