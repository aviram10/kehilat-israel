import { Button, Grid, Input } from '@mui/joy';
import React from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import IconlessRadio from '../comps/radioFrom';

import '../styles/dedication.css';

export default function Dedication(params) {
    return<Grid container spacing={1} sx={{ m: 2 }} >
        <Grid xs={6} >
           <UserDetailsForm/>
        </Grid>
        <Grid xs={6} >
            <div className='choose'><IconlessRadio  values={['לרפואה', 'פרנס היום', 'אזכרה']} />
            </div>
        </Grid>
        <Grid xs={2}></Grid>
        <Grid xs={4}>
            <Input placeholder='הכנס שם'></Input>
        </Grid>
        <Grid xs={2}>
           <Input defaultValue={100}></Input>
        </Grid>
        <Grid xs={2}>
            <Button>המשך</Button>
        </Grid>
    </Grid >
          
};


