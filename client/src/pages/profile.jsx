import { useEffect, useState, createContext, useMemo } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import { Button, Grid, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import Messages from '../comps/messagesComps/messages';
import { url } from '../config/server';
import axios from 'axios';
const server = require('../functions/server');

export const MessagesContext = createContext(null);


const getMessages = async (setMyMessages, setSavedMessages) => {

  try {
    let { data } = await axios.get(`${url}/messages?user_id=${sessionStorage.getItem('user_id')}`, { withCredentials: true })
    setMyMessages(data)
    data = await axios.get(`${url}/messages?liked=true`, { withCredentials: true })
    data = data.data;
    setSavedMessages(data)
  } catch (e) {
    console.log(e)
  }
}

export default function Profile({ params }) {
  const [myMessages, setMyMessages] = useState([])
  const [savedMessages, setSavedMessages] = useState([])
  useEffect(() => {
    getMessages(setMyMessages, setSavedMessages)
  }, [])

  const handleMessages = useMemo(()=>({
    handleSave: async (input) =>{
      
    },
    handleDelete: async (message_id) =>{
      try{
      await server.deleteMessage(message_id)   
      setMyMessages(myMessages.filter(m => m.message_id !== message_id))
      }catch(e){
        console.log(e)
      }
    },
   
  }),[myMessages])

  const  handleSuccess = message =>
  {setSavedMessages(savedMessages.filter(m => m.message_id !== message.message_id))}


  return <>
    <h1>חשבון</h1>
    <Sheet sx={{ m: 2, minHeight: "100vh" }}>

      <Grid container >
        <Grid xs={12} md={5}>
          <UserDetailsForm />
          <Button fullWidth >עדכן</Button>
          <Typography sx={{ mt: 1 }} color='danger' variant='solid' level='title-lg'>סה"כ חובות: 350 ש"ח <Button color='warning'>שלם</Button></Typography>
        </Grid>
        <Grid xs={12} md={7}>
          <Tabs variant='outlined' sx={{ minHeight: "50vh" }} aria-label="Basic tabs" defaultValue={0}>
            <TabList >
              <Tab sx={{ width: "50%" }}>ההודעות שלי</Tab>
              <Tab sx={{ width: "50%" }}>הודעות שמורות </Tab>

            </TabList>
            <TabPanel sx={{ m: "auto" }} value={0}>
              <Messages handleMessage={handleMessages} messages={myMessages} edit={true} />
            </TabPanel>
            <TabPanel sx={{ m: "auto" }} value={1}>
              <Messages messages={savedMessages} handleMessage={{handleSuccess}} />
            </TabPanel>

          </Tabs>
        </Grid>
      </Grid>
    </Sheet>
  </>
};
