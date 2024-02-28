import { useEffect, useState } from 'react';
import { Stack, Button, Typography, Tabs, TabList, Tab, tabClasses, TabPanel, Sheet, Modal, Input } from '@mui/joy';
import { deletePosts } from '../server/posts'
import GenericTable from '../comps/muiComps/Table';
import { DateTime } from 'luxon';
import HandleUsers from '../comps/management/users';
import HandleDebts from '../comps/management/debts';
import HandlePrayers from '../comps/management/prayers';
import { useGet } from '../hooks/server';
import UsersHandler from '../comps/management/users2';


export default function Management({ times, setTimes }) {
    const [users, setUsers] = useGet("users");
    const [donations, setDonations] = useGet("donations")
    const [dedications, setDedications] = useGet("dedications")
    const [posts, setPosts] = useGet("posts")
    const [debts, setDebts] = useGet("debts")
    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState("")
    const [prayers, setPrayers] = useState(times?.prayers || [])
    if (prayers.length === 0 && times.prayers.length > 0) setPrayers(times.prayers)

 
    const handleData = data => {
        if(!(data instanceof Array)) return [];
        if(!data[0]?.username)
            data = data.map(r => ({...r, username: users.find(user => user.user_id === r.user_id).username}))
        return data.filter(e => e.username.includes(search));
    }

    useEffect(() => {
        setTimes(prev => ({ ...prev, prayers }));
    }, [prayers])

    const handleSearch = ({ target }) => {
        setSearch(target.value)
    }

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
        <Input value={search} onChange={handleSearch} />
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
                <UsersHandler {...{ users: handleData(users), setUsers, selected, setSelected, tableProps }} />
            </TabPanel>
            <TabPanel value={1}>
                <GenericTable {...tableProps} data={donations} heads={["ID", "מזהה משתשמש", "סכום", "תאריך"]} />
            </TabPanel>
            <TabPanel value={2}>
                <HandleDebts {...{ debts: handleData(debts), setDebts, selected, setSelected, tableProps }} />
            </TabPanel>
            <TabPanel value={3}>
                <GenericTable data={dedications}  {...tableProps} heads={["ID", "מזהה תרומה", "User ID", "תאריך", "הקדשה", "סוג"]} />
            </TabPanel>
            <TabPanel value={4}>
                <HandlePrayers {...{ prayers, setTimes, setPrayers, selected, setSelected, tableProps }} />
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
