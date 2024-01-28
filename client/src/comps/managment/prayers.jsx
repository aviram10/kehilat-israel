import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import PrayerForm from "../forms/prayerForm";
import { Button } from "@mui/joy";
import { deletePrayer, addPrayer, updatePrayer } from "../../server/prayer";
import { useState } from "react";


export default function HandlePrayers({ tableProps, prayers, setPrayers, selected, setSelected }) {
    const [message, setMessage] = useState([]);
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
                            setTimeout(() => setMessage([]), 5000)
                    })
                break;
            case "addPrayer":
                result  = await addPrayer(prayer);
                handleResponse(result)    
                break;
            case "updatePrayer":
                     result  = await updatePrayer(prayer);
                     setPrayers(prev => prev.filter(p => p.id !== prayer.id ))
                     handleResponse(result);
                    break;
            default:
                break;
        }
    }
    const handleResponse = (result) => {
        if (result.status === 200) {
            setPrayers(prev => [...prev, result.data].sort((a,b )=> a.serial - b.serial))
            setMessage(["success", " הפעולה בוצעה בהצלחה!"])
        }
        else {
            setMessage(["error", "הפעולה הלא הצליחה! נסה שוב מאוחר יות"])
        }
        setTimeout(() => setMessage([]), 5000)
    }

    return <>
    {/* {message[0] && <GenericAlert title={message[0]} body={message[1]} setMessage= {setMessage}   />} */}
        <GenericTable data={prayers} {...tableProps} heads={["ID", "תפילה", "זמן היום", "דקות", "קבוע", "קבוצה", "סידורי", "שעה"]}>
            <FormModal title="הוסף תפילה" message={message} >
                <PrayerForm handlePrayer={handlePrayer} />
            </FormModal>
            <FormModal disabled={!(selected?.length === 1)} title="עדכן תפילה" >
                <PrayerForm pray={prayers.find(p => p.id == selected[0])} handlePrayer ={handlePrayer} />
            </FormModal>
            <Button disabled={selected?.length === 0} variant='outlined' color='danger' name="delete Prayer"
                onClick={() => handlePrayer("deletePrayer")}> מחק תפילה</Button>
        </GenericTable>
    </>
};

