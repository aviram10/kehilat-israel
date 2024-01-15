import React from 'react';
import DayTimes from '../comps/dayTimes';
import PrayersTimes from '../comps/prayersTimes';
import "../styles/times.css"
import { Divider, Grid, Modal } from '@mui/joy';
import Prayer from '../comps/prayerForm';
import BasicModalDialog from '../comps/muiComps/formModal';

export default function Times({ times }) {


    return <Grid container>
        <Grid xs={12} sm={6} md={4} lg={3} xl={2}>
            <DayTimes times={times.dayTimes} />
        </Grid>
        <Divider orientation='vertical' />
        <Grid xs={12} sm={6} md={4} lg={3} xl={2}>
            <PrayersTimes times={times.prayers} />
        </Grid>
    </Grid>
};
