import React, { useEffect } from 'react';
import { Grid, Stack, Sheet, Typography, Input } from '@mui/joy';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../config/server';
import {Button} from '@mui/joy';

export default function UserDetailsForm() {
    const [user, setUser] = useState({first_name: '', last_name: '', phone: '', email: ''})
    useEffect(() => {
        console.log("useeffect");
        axios.get(`${url}/users/${Cookies.get('user_id')}`, { withCredentials: true })
        .then(({data})=>{
            console.log(data);
            setUser(data)
        }).catch(error => console.log(error))
    },[])

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
        <Sheet  variant='soft'>
                <Stack >
                    <Typography level='title-lg' textAlign={"center"}>
                        פרטים אישיים
                    </Typography>
                    <Grid container sx={{m: 2}} spacing={2} >
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                שם פרטי
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                          <Input name='first_name' onChange={handleChange} value={user.first_name} required></Input>
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                שם משפחה
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='last_name' onChange={handleChange} value={user.last_name} required></Input> 
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                פלאפון
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='phone' onChange={handleChange} value={user.phone} required></Input>
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                אימייל
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                         <Input name='email' onChange={handleChange} value={user.email} required></Input> 
                        </Grid>
                    </Grid>
                    <Button onClick={handleSubmit} fullWidth >עדכן</Button>
                </Stack>
            </Sheet>
    );
}

