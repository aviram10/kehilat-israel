import React from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import Stack from '@mui/joy/Stack';
import { Button, Grid, Sheet } from '@mui/joy';
import SaveItems from '../comps/saveItems';

export default function Profile({params}) {
  return<>
  <Sheet   sx={{m:2, minHeight: "100vh"}}>
  <Grid container spacing={1}>
    <Grid  xs={12} md={5}>
        <UserDetailsForm/>
        <Button fullWidth >עדכן</Button>
    </Grid>
    <Grid  xs={12} md={7}>
        <SaveItems/>
    </Grid>
  </Grid>
  </Sheet>
  </>
};
