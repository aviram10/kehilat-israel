import FormModal from "../muiComps/formModal";
import PrayerForm from "../forms/prayerForm";
import { Button } from "@mui/joy";
import { deletePrayer, addPrayer, updatePrayer } from "../../server/prayer";
import {useState } from "react";
import Table2 from "../muiComps/table2";

const heads = [
    {
        id: 'prayer_id',
        numeric: false,
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'שם'
    },
    {
        id: 'dependency',
        numeric: false,
        disablePadding: false,
        label: 'זמן היום'
    },
    
    {
        id: "minutes", 
        numeric: false,
        disablePadding: false,
        label: "דקות"
    },
    {
        id: "fixed",
        numeric: false,
        disablePadding: false,
        label: "קבוע"
    },
    {
        id: "group",
        numeric: false,
        disablePadding: false,
        label: "קבוצה"
    },
    {
        id: 'serial',
        numeric: false,
        disablePadding: false,
        label: 'סידורי'
    },
    {
        id: "time",
        numeric: false,
        disablePadding: false,
        label: "שעה"
    }
]


export default function PrayersHandler({ tableProps, prayers, setPrayers }) {
    const { selected, setSelected } = tableProps;
    const [message, setMessage] = useState(null);
    const handlePrayer = async (action, prayer) => {
        let result;
        switch (action) {
            case "deletePrayer":
                const rejected = []
                const results = selected.map(async (id) => deletePrayer(id))
                Promise.allSettled(results)
                    .then(data => {
                        data.forEach((result) => {
                            result.status === "fulfilled" ?
                                setPrayers(prev => prev.filter(prayer => prayer.id != result.value.data)) :
                                rejected.push(result)
                        })
                        setSelected(rejected)
                        setMessage(rejected.length > 0 ?
                            ["error", " לא כל התפילות נמחקו בהצלחה! נסה שוב מאוחר יותר"]
                            : ["success", "התפילות נמחקו בהצלחה!"])
                    })
                break;
            case "addPrayer":
                result = await addPrayer(prayer);
                handleResponse(result)
                break;
            case "updatePrayer":
                result = await updatePrayer(prayer);
                setPrayers(prev => prev.filter(p => p.id !== prayer.id))
                handleResponse(result);
                break;
            default:
                break;
        }
        setTimeout(() =>{ setMessage(null); setSelected([])}, 3000)

    }
    const handleResponse = (result) => {
        if (result.status === 200) {
            setPrayers(prev => [...prev, result.data].sort((a, b) => a.serial - b.serial))
            setMessage(["success", " הפעולה בוצעה בהצלחה!"])
        }
        else {
            setMessage(["error", "הפעולה הלא הצליחה! נסה שוב מאוחר יות"])
        }
        setTimeout(() => setMessage(null), 5000)
    }

    return <>
        <Table2 {...{ data: prayers, tableProps, heads, selected_id:"id" }}>
            <FormModal title="הוסף תפילה" message={message} setMessage={setMessage} >
                <PrayerForm handlePrayer={handlePrayer} />
            </FormModal>
            <FormModal disabled={!(selected?.length === 1)} message={message} setMessage={setMessage} title="עדכן תפילה" >
                <PrayerForm pray={prayers.find(p => p.id == selected[0])} handlePrayer={handlePrayer} />
            </FormModal>
            <Button disabled={selected?.length === 0} variant='outlined' color='danger' name="delete Prayer"
                onClick={() => handlePrayer("deletePrayer")}> מחק תפילה</Button>
        </Table2>
    </>
};

