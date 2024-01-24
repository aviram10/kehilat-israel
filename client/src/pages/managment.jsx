import { useEffect, useState } from 'react';
import { Stack, Button, Typography, Tabs, TabList, Tab, tabClasses, TabPanel, Sheet, Modal, Input } from '@mui/joy';
import { getDebts, getDedications, getDonations } from '../server/general';
import { getPosts, deletePosts } from '../server/posts'
import GenericTable from '../comps/muiComps/Table';
import { DateTime } from 'luxon';
import HandleUsers from '../comps/managment/users';
import { getUsers } from '../server/users';
import HandleDebts from '../comps/managment/debts';
import HandlePrayers from '../comps/managment/prayers';



export default function Managment({ times }) {
    const [users, setUsers] = useState([])
    const [donations, setDonations] = useState([])
    const [dedications, setDedications] = useState([])
    const [prayers, setPrayers] = useState([])
    const [posts, setPosts] = useState([])
    const [debts, setDebts] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getUsers().then(res => setUsers(res))
        setPrayers(times.prayers)
        getDonations().then(res => setDonations(res))
        getDedications().then(res => setDedications(res))
        getPosts().then(res => setPosts(res.map(post => {
            delete post.liked
            delete post.username;
            delete post.role;
            return post
        })))
        getDebts().then(res => setDebts(res))
    }, [times])

    const handleChange = ({ target }) => {
        console.log(target.name);
        setSelected(selected.includes("" + target.name)
            ? selected.filter(s => s !== target.name)
            : [...selected, target.name])
    }

    const handleDeletePost = async () => {
        const results = await deletePosts(selected)
        results.forEach((result) => {
            result.status === "fulfilled" &&
                setPosts(prev => prev.filter(post => post.post_id != result.value.data))
        })
        setSelected([])
    }

    const tableProps = { handleChange, selected, }

    const sx = { m: 4, p: 4, textAlign: "center" }
    return <Sheet >
        <Stack direction={"row"} justifyContent={'center'} height={"15%"}>
            <Typography sx={sx} color='success' variant='outlined' level='title-lg'>סה"כ תרומות החודש: {donations.reduce((a, b) => { return b.date.slice(0, 7) === DateTime.now().toFormat("yyyy-MM") ? a + b.amount : 0 }, 0)} </Typography>
            <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ משתמשים חודשיים: 250</Typography>
        </Stack>
        <Tabs variant='outlined' aria-label="Basic tabs" defaultValue={0}
            sx={{
                [`& .${tabClasses.root}`]: {
                    fontSize: 'sm',
                    fontWeight: 'lg',
                    [`&[aria-selected="true"]`]: {
                        color: 'primary.500',
                        bgcolor: 'background.surface',
                    },
                    [`&.${tabClasses.focusVisible}`]: {
                        outlineOffset: '-4px',
                    },
                },
            }}
            onChange={() => setSelected([])}
        >
            <TabList disableUnderline variant='soft' color="primary" tabFlex="auto" sx={{ justifyContent: "space-evenly" }}>
                <Tab disableIndicator>משתמשים </Tab>
                <Tab disableIndicator>תרומות</Tab>
                <Tab disableIndicator>חובות</Tab>
                <Tab disableIndicator>הקדשות</Tab>
                <Tab disableIndicator>תפילות</Tab>
                <Tab disableIndicator>פוסטים</Tab>
            </TabList>
            <TabPanel value={0}>
                <HandleUsers {...{ users, setUsers, selected, setSelected, tableProps }} />
            </TabPanel>
            <TabPanel value={1}>
                <GenericTable {...tableProps} data={donations} heads={["ID", "מזהה משתשמש", "סכום", "תאריך"]} />
            </TabPanel>
            <TabPanel value={2}>
                <HandleDebts {...{ debts, setDebts, selected, setSelected, tableProps }} />
            </TabPanel>
            <TabPanel value={3}>
                <GenericTable data={dedications}  {...tableProps} heads={["ID", "מזהה תרומה", "User ID", "תאריך", "הקדשה", "סוג"]} />
            </TabPanel>
            <TabPanel value={4}>
                <HandlePrayers {...{ prayers, setPrayers, selected, setSelected, tableProps }} />
            </TabPanel>
            <TabPanel value={5}>
                <GenericTable data={posts} {...tableProps} heads={["ID", "מזהה משתמש", "כותרת", "תוכן", "תאריך", "לייקים", "קטגוריה"]}>
                    <Button color='danger' name={"deletePost"} variant='outlined' onClick={handleDeletePost}>מחק פוסט</Button>
                </GenericTable>
            </TabPanel>
            <TabPanel value={6}>
            </TabPanel>
        </Tabs>
    </Sheet >
}
