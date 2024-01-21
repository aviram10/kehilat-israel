import { Button, Card, CardActions, Input, Option, Radio, Select, Stack } from '@mui/joy';
import React     from 'react';
import TimePick from '../muiComps/timePicker';
import { handlePrayer } from '../../server/server';
export default function PrayerForm({ pray}) {
    console.log("prayerForm", pray);
  
    const [prayer, setPrayer] = React.useState(pray ? {...pray, mode: pray.fixed ? "fixed":"depend"} : { prayer_name: "", mode: "fixed", time: "", minutes: "", depend: "", category: "weekdays", serial: "" })
    const [message, setMessage] = React.useState("");
    const handleChange = ({target}) => { setPrayer({ ...prayer, [target?.name]: target?.value}) };
    const selectTime = (time) => setPrayer({ ...prayer, fixed: time.toISOTime().slice(0, 5) });
    const handleSubmit = (e) => {
        console.log(prayer);
        e.preventDefault()
        if (prayer.mode === "fixed") {
            prayer.minutes = null;
            prayer.depend = null;
        }
        else prayer.fixed = null;
        console.log(prayer);
      pray? handlePrayer(2, prayer):handlePrayer(1, prayer)
    }
    return <>
        <form onSubmit={handleSubmit}>
            <Card variant='plain'>
                <Input required name="prayer_name" value={prayer.prayer_name} onChange={handleChange} placeholder='שם התפילה'></Input>
                <Radio
                    name='mode'
                    value={"fixed"}
                    checked={prayer.mode === "fixed"}
                    sx={{ direction: "ltr", flexDirection: "row-reverse", textAlign: "right" }}
                    label="זמן קבוע"
                    onChange={handleChange} />
                <Radio
                    name='mode'
                    checked={prayer.mode === "depend"}
                    value={"depend"}
                    sx={{ direction: "ltr", flexDirection: "row-reverse", textAlign: "right" }}
                    label="לפי זמני היום"
                    onChange={handleChange} />

                {prayer.mode === "fixed" && <TimePick selectTime={selectTime} time={pray?.time} />}
                {prayer.mode === "depend" && <>
                    <Input onChange={handleChange} required type='number' placeholder='דקות' value={pray?.minutes}></Input>
                    <Select defaultValue={pray?.dependency}   name='dependency' onChange={handleChange} placeholder="לפי זמן">
                        <Option value="sunrise">זריחה</Option>
                        <Option value="sunset">נץ החמה</Option>
                        <Option value="miday">חצות היום</Option>
                        <Option value="sunset">שקיעה</Option>
                        <Option value="midnight">חצות לילה</Option>
                    </Select>
                </>

                }
                <Stack direction='row' justifyContent={"space-between"} >
                < Select required   name='category' onChange={handleChange} placeholder="קטגוריה">
                    <Option value="weekdays">ימות חול</Option>
                    <Option value="shabat">שבת ומועדים</Option>
                </Select>
                <Input sx={{width:"50%"}} type='number' value={prayer.serial} required name="serial" onChange={handleChange} placeholder='מספר סידורי'></Input>
                </Stack>
                <CardActions>
                    <Button type='submit' variant='solid' color='primary'>שמור</Button>
                </CardActions>
            </Card>
        </form>

    </>
};
