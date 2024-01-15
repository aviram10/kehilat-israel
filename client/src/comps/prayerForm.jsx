import { Button, Card, CardActions, Input, Option, Radio, Select, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import TimePick from './muiComps/timePicker';
import { addPrayer, editPrayer } from '../functions/prayer';

export default function PrayerForm(mode, prayer_id) {
    const [prayer, setPrayer] = React.useState({ name: "", time: "", mode: "fixed", category: "", depend: "", minutes: 0 })
    const [message, setMessage] = React.useState("");
    const handleChange = ({target}) => { setPrayer({ ...prayer, [target.name]: target.value}) };
    const selectTime = (time) => setPrayer({ ...prayer, time: time.toISOTime().slice(0, 5) });
    const handleSubmit = () => {
        if (prayer.mode === "fixed") {
            prayer.minutes = null;
            prayer.depend = null;
        }
        else prayer.time = null;
        mode === "edit" ? addPrayer(prayer) : editPrayer(prayer, prayer_id)
    }
    return <>
        <form onSubmit={handleSubmit}>
            <Card variant='plain'>
                <Input required name="name" onChange={handleChange} placeholder='שם התפילה'></Input>
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

                {prayer.mode === "fixed" && <TimePick selectTime={selectTime} />}
                {prayer.mode === "depend" && <>
                    <Input required type='number' placeholder='דקות'></Input>
                    <Select   name='category' onChange={handleChange} placeholder="לפי זמן">
                        <Option value="sunrise">זריחה</Option>
                        <Option value="sunset">נץ החמה</Option>
                        <Option value="miday">חצות היום</Option>
                        <Option value="sunset">שקיעה</Option>
                        <Option value="midnight">חצות לילה</Option>
                    </Select>
                </>

                }
                <Select required name='category' onChange={handleChange} placeholder="קטגוריה">
                    <Option value="weekdays">ימות חול</Option>
                    <Option value="shabat">שבת ומועדים</Option>
                </Select>
                <CardActions>
                    <Button type='submit' variant='solid' color='primary'>שמור</Button>
                </CardActions>

            </Card>
        </form>

    </>
};
