import React from 'react';
import { Stack, Typography, Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import GenericTable from '../comps/Table';
import {users, donations, messages} from '../demoData';
import Messages from '../comps/messages';

export default function Managment(params) {
        const sx= {m:4, p: 4, textAlign: "center"}
     
        
        return <>
                <Stack  direction={"row"} justifyContent={'center'}>
                        <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ תרומות החודש: 10,000 ש"ח</Typography>
                        <Typography sx={sx} color='success' variant='outlined' level='title-lg'> סה"כ משתמשים חודשיים: 250</Typography>
                </Stack>
                <Tabs  aria-label="Basic tabs" defaultValue={0}>
            <TabList sx={{justifyContent: "space-evenly"}}>
                <Tab>משתמשים </Tab>
                <Tab>תרומות</Tab>
                <Tab>חובות</Tab>
                <Tab>הקדשות</Tab>
                <Tab>תפילות</Tab>
                <Tab>הודעות</Tab>
            </TabList>
            <TabPanel value={0}>
                <GenericTable data={users} />
            </TabPanel>
            <TabPanel value={1}>
            <GenericTable data={donations} />
            </TabPanel>
            <TabPanel value={2}>
               <Messages times={3} />
            </TabPanel>
        </Tabs>
        </>
};
