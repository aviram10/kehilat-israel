import React, { useEffect } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import { Button, Grid, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import Messages from '../comps/messagesComps/messages';
import { url } from '../config/server';
import axios from 'axios';

const getMessages =async (setMyMessages, setSavedMessages ) => {
  try{
     const {data} = await axios.get(`${url}/messages?user_id=${sessionStorage.getItem('user_id')}`)
     console.log(data);
     setMyMessages(data)
  }catch(e){
    console.log(e)
  }
}

export default function Profile({params}) {
  const [myMessages, setMyMessages] = React.useState([])
  const [savedMessages, setSavedMessages] = React.useState([])
  useEffect(()=>{
    console.log('useEffect');
    getMessages(setMyMessages, setSavedMessages)
  },[])

  useEffect(()=>{
    console.log(myMessages);
  },[myMessages])


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
  <Messages messages={myMessages} />
  </TabPanel>
  
</Tabs>
    </Grid>
  </Grid>
  </Sheet>
  </>
};
