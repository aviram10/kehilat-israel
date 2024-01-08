import { useEffect, useState } from 'react';
import { Stack, Typography, Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import {getDebts, getDedications, getDonations, getPosts, getUsers, getTimes} from '../functions/server';
import GenericTable from '../comps/Table';

export default function Managment(params) {
    const [users, setUsers] = useState([])
    const [donations, setDonations] = useState([])
    const [dedications, setDedications] = useState([])
    const [prayers, setPrayers] = useState([])
    const [posts, setPosts] = useState([])
    const [debts, setDebts] = useState([])

    useEffect(()=>{
        console.log('useEffect');
        getUsers().then(res=>{console.log("res", res);setUsers(res)})
        getDonations().then(res=>setDonations(res))
        getDedications().then(res=>setDedications(res))
        // getTimes().then(res=>setPrayers(res.data.prayers))
        getPosts().then(res=> setPosts(res.map(post => {
            console.log(post);
            delete post.liked
            delete post.username;
            delete post.role;
            return post
        })))
        getDebts().then(res=>setDebts(res))
    },[])

    const sx = { m: 4, p: 4, textAlign: "center" }

    return <>
        <Stack direction={"row"} justifyContent={'center'}>
            <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ תרומות החודש: 10,000 ש"ח</Typography>
            <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ משתמשים חודשיים: 250</Typography>
        </Stack>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
            <TabList sx={{ justifyContent: "space-evenly" }}>
                <Tab>משתמשים </Tab>
                <Tab>תרומות</Tab>
                <Tab>חובות</Tab>
                <Tab>הקדשות</Tab>
                <Tab>תפילות</Tab>
                <Tab>פוסטים</Tab>
            </TabList>
            <TabPanel value={0}>
            <GenericTable data={users} 
            heads={["ID", "שם משתמש", "שם פרטי", "שם משפחה", "סיסמא", "מייל", "פלאפון", "רחוב", "עיר", "מדינה", "מיקוד", "תפקיד", "פעולות" ]} />
            </TabPanel>
            <TabPanel value={1}>
               <GenericTable data={donations} heads={["ID", "שם משתמש", "סכום", "תאריך", "פעולות" ]} />
            </TabPanel>
            <TabPanel value={2}>
                <GenericTable data={debts} heads={["ID", "שם משתמש", "סכום", "פעולות" ]} />
            </TabPanel>
            <TabPanel value={3}>
                <GenericTable data={dedications} heads={["ID", "מזהה תרומה", "User ID", "תאריך", "הקדשה", "סוג", "פעולות" ]} />
            </TabPanel>
            <TabPanel value={4}>
                <GenericTable data={prayers} heads={["ID", "שם משתמש", "סכום", "תאריך", "פעולות" ]} />
            </TabPanel>
            <TabPanel value={5}>
                <GenericTable data={posts} heads={["ID", "מזהה משתמש", "כותרת", "תוכן", "תאריך","מעורבות","קטגוריה", "פעולות" ]} />
            </TabPanel>
            <TabPanel value={6}>
                
            </TabPanel>

        </Tabs>
    </>

};
