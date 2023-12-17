import React from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import { Button, Grid, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import Messages from '../comps/messages';



export default function Profile({params}) {
  return<>
  <h1>חשבון</h1>
  <Sheet   sx={{m:2, minHeight: "100vh"}}>
  
  <Grid container >
    <Grid  xs={12} md={5}>
        <UserDetailsForm/>
        <Button fullWidth >עדכן</Button>
        <Typography sx={{mt:1}} color='danger' variant='solid' level='title-lg'>סה"כ חובות: 350 ש"ח <Button color='warning'>שלם</Button></Typography>
    </Grid>
    <Grid   xs={12} md={7}>
    <Tabs variant='outlined' sx={{minHeight: "50vh"}} aria-label="Basic tabs" defaultValue={0}>
  <TabList >
    <Tab sx={{width:"50%"}}>ההודעות שלי</Tab>
    <Tab sx={{width:"50%"}}>הודעות שמורות </Tab>
    
  </TabList>
  <TabPanel sx={{m:"auto"}} value={0}>
   <Messages times={1} />
  </TabPanel>
  <TabPanel sx={{m:"auto"}}  value={1}>
  <Messages times={3} />
  </TabPanel>
  
</Tabs>
    </Grid>
  </Grid>
  </Sheet>
  </>
};
