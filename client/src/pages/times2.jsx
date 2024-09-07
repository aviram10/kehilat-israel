import React from 'react';
import DayTimes from '../comps/dayTimes';
import PrayersTimes from '../comps/prayersTimes';
import "../styles/times.css"
import { Grid, Typography, Box } from '@mui/joy';
import Clock from 'react-clock'
import { useEffect, useState } from 'react';

export default function Times({ times }) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Grid m={1} container spacing={2}>

      <Grid xs={12} justifyContent="center">
      <Box m={"auto"} width={"fit-content"}   border={1} px={2} py={2}>
      <Typography variant="h4" align="center" ><div style={{direction: "ltr"}}>{value.toLocaleTimeString()}</div></Typography>
    </Box>
      </Grid>
      <Grid xs={12}>
        <Typography level="h1" fontSize="xxl" textAlign="center" mb={2}>
         בית כנסת קהילת ישראל
        </Typography>
      </Grid>
      <Grid xs={12} container spacing={2}>
        <Grid xs={6}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <DayTimes times={times.dayTimes} />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <PrayersTimes times={times.prayers} />
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12} container spacing={2}>
        <Grid xs={4}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <Typography level="h5" textAlign="center" mb={1}>
              משנה יומית
            </Typography>
            <Typography textAlign="center">מועד קטן</Typography>
            <Typography textAlign="center">some text here</Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <Typography level="h5" textAlign="center" mb={1}>
              הלכה יומית
            </Typography>
            <Typography textAlign="center">תורת המועדים</Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <Typography level="h5" textAlign="center" mb={1}>
              דף יומי
            </Typography>
            <Typography textAlign="center">מועד קטן כ׳׳ה</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12}>  
        <Typography textAlign="center">זמני היום • שעון קיץ • משיב הרוח • מוריד הגשם • טל ומטר • ברכי נפשי</Typography>
      </Grid>
    </Grid>
  );
}