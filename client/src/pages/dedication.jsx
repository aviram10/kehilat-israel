import { Button, CssBaseline, Grid, Input, Typography } from '@mui/joy';
import React from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import IconlessRadio from '../comps/radioFrom';
import dedicationBoard from '../assets/dedicationBoard.png';

import '../styles/dedication.css';

export default function Dedication(params) {
    return <>
        <Grid container minHeight={"100vh"} spacing={1} sx={{ m: 2, alignContent: "space-evenly", justifyContent: "center" }} >

            <Grid alignItems={"center"} justifyContent={"center"} display={"flex"} xs={12}>
                <Typography level='h1' textAlign={"center"}>   דף הנצחה </Typography>
                <img src={dedicationBoard} alt="dedication board" width={150} height={150} />
            </Grid>
            <Grid lg={7} md={6} xs={8} >
                <UserDetailsForm />
            </Grid>
            <Grid  >
                <IconlessRadio values={['לרפואה', 'פרנס היום', 'אזכרה']} />
            </Grid>
            <Grid justifyContent={"center"} display={'flex'}  xs={10}>
               
                    
                <Input sx={{m:1}}></Input>
                <Input sx={{m:1}}></Input>
                <Button sx={{m:1}}>תרום</Button>
            
            </Grid>
        </Grid >
    </>

};


