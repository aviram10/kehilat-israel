import { useEffect, useState, useMemo } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import { Button, Grid, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import Messages from '../comps/messagesComps/messages';
import { url } from '../config/server';
import axios from 'axios';
import { deleteMessage, toggleLike } from '../functions/server';
import Cookies from 'js-cookie';

export default function Profile({ params }) {
  const [myMessages, setMyMessages] = useState([])
  const [savedMessages, setSavedMessages] = useState([])
  useEffect(() => {
    axios.get(`${url}/users/${Cookies.get('user_id')}/messages?type=all`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setMyMessages(data.myMessages);
        setSavedMessages(data.savedMessages);
      })
      .catch(e => console.log(e))
    }, [])

    const handleMyMessages = useMemo(() => ({
      save: async (input, message_id) => {
        try{
          const { data} = await axios.put(`${url}/messages/${message_id}`, { input }, { withCredentials: true })
          setMyMessages(myMessages.map(m => m.message_id === message_id ? data : m))
        }catch(e){
          console.log(e)
        }
      },
      delete: async (message_id, event) => {
        try {
          event.stopPropagation();
          await deleteMessage(message_id)
          setMyMessages(prev => prev.filter(m => m.message_id !== message_id))
        } catch (e) {
          console.log(e)
        }
      },
      toggleLike: () => { },
      edit: true
    }), [])

    const handleSavedMessages = useMemo(() => ({
      toggleLike: async message_id => {
        try {
          await toggleLike(message_id);
          //copy the message and change the liked property
          setSavedMessages(prev => prev.filter(m => m.message_id !== message_id))
        } catch (e) {
          console.log(e)
        }
      }
    }), [])

    return <>
      <h1>חשבון</h1>
      <Sheet sx={{ m: 2, minHeight: "100vh" }}>

        <Grid container >
          <Grid xs={12} md={5}>
            <UserDetailsForm  />
           
            <Typography sx={{ mt: 1 }} color='danger' variant='solid' level='title-lg'>סה"כ חובות: 350 ש"ח <Button color='warning'>שלם</Button></Typography>
          </Grid>
          <Grid xs={12} md={7}>
            <Tabs variant='outlined' sx={{ minHeight: "50vh" }} aria-label="Basic tabs" defaultValue={0}>
              <TabList >
                <Tab sx={{ width: "50%" }}>ההודעות שלי</Tab>
                <Tab sx={{ width: "50%" }}>הודעות שמורות </Tab>

              </TabList>
              <TabPanel sx={{ m: "auto" }} value={0}>
                <Messages handleMessage={handleMyMessages} messages={myMessages} />
              </TabPanel>
              <TabPanel sx={{ m: "auto" }} value={1}>
                <Messages messages={savedMessages} handleMessage={handleSavedMessages} />
              </TabPanel>

            </Tabs>
          </Grid>
        </Grid>
      </Sheet>
    </>
  };
