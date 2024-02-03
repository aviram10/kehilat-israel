import { Button, Card, CardActions, Input, Option, Radio, Select, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import TimePick from '../muiComps/timePicker';
export default function PrayerForm({ pray, handlePrayer }) {
    const action = pray ? "updatePrayer" : "addPrayer";
    const [prayer, setPrayer] = React.useState(pray ? { ...pray, mode: pray.fixed ? "fixed" : "depend" } : { prayer_name: "", dependency:"", mode: "fixed", time: "", minutes: "",  category: "weekdays", serial: "" })
    const handleChange = ({ target }, value) => {  setPrayer({ ...prayer, [target.name]: value || target.value }) };
    const selectTime = (time) => setPrayer({ ...prayer, fixed: time.toISOTime().slice(0, 5) });
    const handleSubmit = (e) => {
        e.preventDefault()
        if (prayer.mode === "fixed") {
            prayer.minutes = null;
            prayer.depend = null;
        }   
        else prayer.fixed = null;
        delete prayer.mode;
        handlePrayer(action, prayer)
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
                    <Input onChange={handleChange} required type='number'  name={"minutes"} placeholder='דקות' value={prayer?.minutes || ""}></Input>
                    <Select  defaultValue={ prayer?.dependency}  onChange={(e, value) => {if(!e) return; e.target.name = "dependency"; handleChange(e, value) }} placeholder="לפי זמן">
                        <Option value="dawn ">זריחה</Option>
                        <Option value="sunrise">נץ החמה</Option>
                        <Option value="chatzot ">חצות היום</Option>
                        <Option value="sunset">שקיעה</Option>
                        <Option value="midnight">חצות לילה</Option>
                    </Select>
                </>

                }
                <Stack direction='row' justifyContent={"space-between"} >
                    < Select required  onChange={(e, value) => { e.target.name = "category"; handleChange(e, value) }} value={prayer?.category || ""} placeholder="קטגוריה">
                        <Option value="weekdays">ימות חול</Option>
                        <Option value="shabat">שבת ומועדים</Option>
                    </Select>
                    <Input sx={{ width: "50%" }} type='number' value={prayer.serial} required name="serial" onChange={handleChange} placeholder='מספר סידורי'></Input>
                </Stack>
                <CardActions>
                    <Button type='submit' variant='solid' color='primary'>שמור</Button>
                </CardActions>
            </Card>
        </form>

    </>
};
