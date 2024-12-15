import "../styles/home.css";
import { Divider, Grid } from "@mui/joy";
import PrayersTimes from "../comps/prayersTimes";
import MyGallery from "../comps/galleryImages";
import DayTimes from "../comps/dayTimes";
import { Typography } from "@mui/joy";
import { DateTime } from "luxon";



export default function Home({ times}) {

    return <Grid  container maxWidth={"100%"} margin={2}  rowSpacing={10} spacing={2}>
        
        <Grid  lg={8} md={6} xs={12}>
            <div className="info" >
                <h1> בית כנסת - קהילת ישראל </h1>
                <h2> קהילה שהיא גם בית </h2>
            </div>
            <p>  ברוכים הבאים לאתר "קהילת ישראל" – הבית הדיגיטלי של קהילתנו!
            כאן תמצאו את כל המידע על זמני התפילות, שיעורים ואירועים, לצד כלים אינטראקטיביים כמו לוח מודעות קהילתי, אפשרות לתרומות והקדשות מקוונות, וגישה לאזור אישי לניהול פעילויותיכם. מטרתנו היא לחבר את הקהילה שלנו בצורה נוחה ומתקדמת, תוך שמירה על הערכים והמסורת שמאחדים אותנו. הצטרפו אלינו, ותהיו חלק מהחיים הקהילתיים שלנו – גם בעולם הדיגיטלי.  </p>
            {/* <p> ברוכים הבאים לאתר הבית כנסת שלנו. אנחנו קהילה חרדית שמחה ומאוחדת, שמקיימת את התורה והמצוות באהבה וביראה. באתר זה תוכלו למצוא מידע על השירותים, השיעורים, האירועים והפעילויות שאנחנו מציעים לחברי הקהילה ולכל המעוניינים. </p> */}
            <MyGallery />
        </Grid>
        <Divider orientation="vertical" sx={{m:1}}  />
        <Grid  lg={3} md={5} xs={10} >
            <Typography sx={{mt:4}} level="title-lg">{DateTime.now().setLocale('he').weekdayLong} {times?.hebrewDate?.hebrew} </Typography>
            <Typography level="body-md"> { times.items.find?.(t=>t.category === "parashat")?.hebrew}</Typography>
            <PrayersTimes isDaily={true} times={ times?.prayers}/>
            <DayTimes times={times.dayTimes} />
        </Grid>
        <Grid xs={12}>
            <Typography level="h2" variant="solid" color="neutral">פרנס היום:  {times?.commissioner?.name || "תרום עוד היום"}  </Typography>
        </Grid>
    </Grid>
}   