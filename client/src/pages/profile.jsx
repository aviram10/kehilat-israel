import { useEffect, useState, useMemo } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import { Button, Grid, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import { url } from '../config/server';
import axios from 'axios';
import Cookies from 'js-cookie';
import Posts from '../comps/postsComps/posts';
import {toggleLike, deletePost} from '../functions/server';


export default function Profile() {
  const [myPosts, setMyPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  useEffect(() => {
    axios.get(`${url}/users/${Cookies.get('user_id')}/posts?type=all`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setMyPosts(data.myPosts);
        setSavedPosts(data.savedPosts);
      })
      .catch(e => console.log(e))
    }, [])

    const handleMyPosts = useMemo(() => ({
      save: async (input, post_id) => {
        try{
          const { data} = await axios.put(`${url}/posts/${post_id}`,  input , { withCredentials: true })
          console.log(data);
          setMyPosts(prev => prev.map(post => post.post_id === post_id ? data : post))
        }catch(e){
          console.log(e)
        }
      },
      delete: async (post_id, event) => {
        try {
          event.stopPropagation();
          await deletePost(post_id)
          setMyPosts(prev => prev.filter(post => post.post_id !== post_id))
        } catch (e) {
          console.log(e)
        }
      },
      toggleLike: () => { },
      
      edit: true
    }), [])

    const handleSavedPosts = useMemo(() => ({
      toggleLike: async post_id => {
        try {
          console.log("post toggle");
          await toggleLike(post_id);
          //copy the message and change the liked property
          setSavedPosts(prev => prev.filter(post => post.post_id !== post_id))
        } catch (e) {
          console.log(e)
        }
      }
    }), [])

    return <>
      <h1>חשבון</h1>
      <Sheet variant=''  sx={{ m: 2, minHeight: "100vh" }}>

        <Grid container spacing={2}>
          <Grid xs={12} md={5}>
            <UserDetailsForm  />
           
            <Typography sx={{ mt: 1 }} color='danger' variant='solid' level='title-lg'>סה"כ חובות: 350 ש"ח <Button color='warning'>שלם</Button></Typography>
          </Grid>
          <Grid xs={12} md={7}>
            <Tabs variant='soft' sx={{ minHeight: "50vh" }} aria-label="Basic tabs" defaultValue={0}>
              <TabList >
                <Tab variant='soft' color='primary' sx={{ width: "50%" }}>ההודעות שלי</Tab>
                <Tab variant='soft' color='primary' sx={{ width: "50%" }}>הודעות שמורות </Tab>

              </TabList>
              <TabPanel  sx={{ m: "auto" }} value={0}>
                <Posts handlePosts={handleMyPosts} posts={myPosts} />
              </TabPanel>
              <TabPanel sx={{ m: "auto" }} value={1}>
                <Posts posts={savedPosts} handlePosts={handleSavedPosts} />
              </TabPanel>

            </Tabs>
          </Grid>
        </Grid>
      </Sheet>
    </>
  };
