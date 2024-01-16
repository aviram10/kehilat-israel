import { useEffect, useState } from 'react';
import { Stack, Button, Typography, Tabs, TabList, Tab, tabClasses, TabPanel, Sheet, Modal } from '@mui/joy';
import { getDebts, getDedications, getDonations } from '../server/general';
import { getPosts, deletePosts } from '../server/posts'
import { getUsers, deleteUsers, manager } from '../server/users'
import { getTimes } from '../server/time';
import GenericTable from '../comps/muiComps/Table';
import { DateTime } from 'luxon';
import FormModal from '../comps/muiComps/formModal';
import PrayerForm from '../comps/prayerForm';

export default function Managment({ times }) {
    const [users, setUsers] = useState([])
    const [donations, setDonations] = useState([])
    const [dedications, setDedications] = useState([])
    const [prayers, setPrayers] = useState([])
    const [posts, setPosts] = useState([])
    const [debts, setDebts] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        console.log(times);
        setPrayers(times.prayers)
        getUsers(sessionStorage.user_id).then(res => setUsers(res))
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
    useEffect(() => {
        console.log(selected);
    }, [selected])

    const handleChange = ({ target }) => {
        setSelected(selected.includes("" + target.name)
            ? selected.filter(s => s !== target.name)
            : [...selected, target.name])
    }

    const handleDeleteUsers = async () => {
        console.log("deleteUsers");
        const results = await deleteUsers(selected)
        results.forEach((result) => {
            console.log(result);
            result.status === "fulfilled" &&
                setUsers(prev => prev.map(user => user.user_id == result.value.data ? { ...user, role: "Inactive" } : { ...user }))
        })
        setSelected([])
    }



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

                <GenericTable handleChange={handleChange} data={users} selected={selected}
                    heads={["ID", "שם משתמש", "שם פרטי", "שם משפחה", "סיסמא", "מייל", "פלאפון", "רחוב", "עיר", "מדינה", "מיקוד", "תפקיד"]}>
                    <Button disabled={selected?.length === 0}
                        variant='soft' color='primary' name="manager"
                        onClick={() => {selected.forEach(user_id => manager(user_id)
                            .then(res => setUsers(prev => prev.map(user => user.user_id == user_id ? { ...user, role: "מנהל" } : { ...user })))
                            .catch(err => console.log(err)));
                         setSelected([])}}
                    > הגדר כמנהל
                </Button>
                <Button disabled={selected?.length === 0} variant='soft' color='danger' name="deleteUser"
                    onClick={handleDeleteUsers}
                >מחק משתמש</Button>
            </GenericTable>
        </TabPanel>
        <TabPanel value={1}>
            <GenericTable data={donations} heads={["ID", "מזהה משתשמש", "סכום", "תאריך"]} />
        </TabPanel>
        <TabPanel value={2}>
            <GenericTable data={debts} heads={["ID", "מזהה משתמש ", "סכום"]} />
        </TabPanel>
        <TabPanel value={3}>
            <GenericTable data={dedications} heads={["ID", "מזהה תרומה", "User ID", "תאריך", "הקדשה", "סוג"]} />
        </TabPanel>
        <TabPanel value={4}>
            <GenericTable data={prayers} selected={selected} handleChange={handleChange} heads={["ID", "תפילה", "זמן היום", "דקות", "קבוע","קבוצה","סדר", "שעה"]}>
                <FormModal title="הוסף תפילה" buttonName={"הוסף תפילה"}>
                    <PrayerForm />
                </FormModal>
                <FormModal disabled={!selected?.length === 1}  title="עדכן תפילה" buttonName={"עדכן תפילה "}>
                    <PrayerForm mode="edit" pray={prayers.find(p => p.id == selected[0])} />
                </FormModal>
            </GenericTable>
        </TabPanel>
        <TabPanel value={5}>
            <GenericTable data={posts} heads={["ID", "מזהה משתמש", "כותרת", "תוכן", "תאריך", "מעורבות", "קטגוריה"]}>
                <Button color='danger' name={"deletePost"} variant='solid'>מחק פוסט</Button>
            </GenericTable>
        </TabPanel>
        <TabPanel value={6}>
        </TabPanel>
    </Tabs>
    </Sheet >
}
