import { useEffect, useState, useMemo, useCallback } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import { Button, Grid, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import { url } from '../config/server';
import axios from 'axios';
import Posts from '../comps/postsComps/posts';
import { toggleLike, deletePosts } from '../functions/server';
import Paypal from '../comps/paypal';
const {useNavigate} = require('react-router-dom')


export default function Profile() {
  const navigate = useNavigate()
  const [myPosts, setMyPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [debt, setDebt] = useState()
  const [user, setUser] = useState({ first_name: '', last_name: '', phone: '', email: '', address: '', city: '', state: '' })
  const [paypal, setPaypal] = useState(1)
  
  useEffect(() => {
    if (!sessionStorage.user_id) return  navigate('/login');
    axios.get(`${url}/users/${sessionStorage.user_id}/data`, { withCredentials: true })
    .then(({ data }) => {
      setMyPosts(data.myPosts);
      setSavedPosts(data.savedPosts);
      setDebt(data.debt)
      setUser(data.user)
      setPaypal(prev => prev + 1)
    })
    .catch(e => console.log(e))
  }, [navigate])
  
  const handleUser = useCallback(user =>setUser({...user}),[])

   function success(data){
    setDebt( data.data)
  }
  const handleError = () => {
    console.log("handleError");
    setPaypal(prev => prev + 1)}
  const handleMyPosts = useMemo(() => ({
    save: async (input, post_id) => {
      try {
        const { data } = await axios.put(`${url}/posts/${post_id}`, input, { withCredentials: true })
        setMyPosts(prev => prev.map(post => post.post_id === post_id ? data : post))
      } catch (e) {
        console.log(e)
      }
    },
    delete: async (post_id, event) => {
      try {
        event.stopPropagation();
        await deletePosts(post_id)
        setMyPosts(prev => prev.filter(post => post.post_id !== post_id))
      } catch (e) {
        console.log(e)
      }
    },
    //todo: use ? to make it optional
    toggleLike: () => { },

    edit: true
  }), [])
  async function handleSubmit(e){
    try{
        await axios.put(`${url}/users/${sessionStorage.user_id}`, user, { withCredentials: true })
    }catch(error){
        console.log(error);
    }
}
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
    <Sheet sx={{ m: 2, minHeight: "100vh" }}>

      <Grid container spacing={2}>
        <Grid xs={12} md={5} spacing={2} >
          <UserDetailsForm user={user} handleUser={ handleUser} />
          <Button onClick={handleSubmit} fullWidth >עדכן</Button>

          <Typography sx={{ mt: 1 }} color={debt ?'danger' : "success"} variant='solid' level='title-lg'>סה"כ חובות: {debt || 0}
          </Typography>
            <Paypal key={paypal} amount={debt} type={"debt"} success={success} handleError={handleError} />
        </Grid>
        <Grid xs={12} md={7}>
          <Tabs variant='soft' sx={{ minHeight: "50vh" }} aria-label="Basic tabs" defaultValue={0}>
            <TabList >
              <Tab variant='soft' color='primary' sx={{ width: "50%" }}>ההודעות שלי</Tab>
              <Tab variant='soft' color='primary' sx={{ width: "50%" }}>הודעות שמורות </Tab>

            </TabList>
            <TabPanel sx={{ m: "auto" }} value={0}>
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
