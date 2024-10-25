import React from 'react';
import DayTimes from '../comps/dayTimes';
import PrayersTimes from '../comps/prayersTimes';
import "../styles/times.css"
import { Grid, Typography, Box } from '@mui/joy';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/home.css";


export default function Times({ times }) {
  const [value, setValue] = useState(new Date());
  const [dafYomi, setDafYomi] = useState("טוען...")
  const [dailyMishnah, setDailyMishnah] = useState("טוען...")
  const [halakhahYomit, sethalakhahYomit] = useState("טוען...")

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    axios.get("https://www.sefaria.org/api/calendars").then(({ data: { calendar_items: items } }) =>{
      setDafYomi(items.find(item => item.title.en === "Daf Yomi").displayValue.he)
      setDailyMishnah(items.find(item => item.title.en === "Daily Mishnah").displayValue.he.replace(":", " "))
      sethalakhahYomit(items.find(item => item.title.en === "Halakhah Yomit").displayValue.he.replace(":", " "))
  })

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Grid m={1} container spacing={2}>
      <Grid xs={12} justifyContent="center">
        <Box m={"auto"} width={"fit-content"} border={1} px={2} py={2}>
          <Typography sx={{direction: "ltr"}} variant="h4" align="center" >{value.toLocaleTimeString()}</Typography>
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
            <DayTimes times={times?.dayTimes} />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box border="1px solid" borderColor="divider" p={1}>
            {times.prayers.length > 0 ? <PrayersTimes times={times.prayers} />: "טוען..."}
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12} container spacing={2}>
        <Grid xs={4}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <Typography level="h5" textAlign="center" mb={1}>
              משנה יומית
            </Typography>
            <Typography textAlign="center">{dailyMishnah}</Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <Typography level="h5" textAlign="center" mb={1}>
              הלכה יומית
            </Typography>
            <Typography textAlign="center">{halakhahYomit} </Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box border="1px solid" borderColor="divider" p={1}>
            <Typography level="h5" textAlign="center" mb={1}>
              דף יומי
            </Typography>
            <Typography textAlign="center">{dafYomi}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Typography textAlign="center">זמני היום • שעון קיץ • משיב הרוח • מוריד הגשם • טל ומטר • ברכי נפשי</Typography>
      </Grid>
    </Grid>
  );
}