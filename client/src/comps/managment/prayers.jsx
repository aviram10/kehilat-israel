import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import PrayerForm from "../forms/prayerForm";
import { Button } from "@mui/joy";
const { deletePrayer } = require("../../server/prayer");




export default function HandlePrayers({ tableProps, prayers, setPrayers, selected, setSelected }) {
    const handlePrayer = async (action, prayer) => {
        switch (action) {
            case "deletePrayer":
                const rejected = []
                const results = selected.map(async (id) => deletePrayer(id))
                Promise.allSettled(results)
                    .then(data => {
                        data.forEach((result) => {
                            console.log(result);
                            result.status === "fulfilled" ?
                                setPrayers(prev => prev.filter(prayer => prayer.id != result.value.data)) :
                                rejected.push(result)
                        })
                        setSelected(rejected)
                        const message = rejected.length > 0 ? "לא ניתן למחוק את התפילות הבאות:" + rejected.join(", ") : "התפילות נמחקו בהצלחה"
                        alert(message)
                    })
                break;
            default:
                break;
        }
    }

    return <>
        <GenericTable data={prayers} {...tableProps} heads={["ID", "תפילה", "זמן היום", "דקות", "קבוע", "קבוצה", "סידורי", "שעה"]}>
            <FormModal title="הוסף תפילה" >
                <PrayerForm />
            </FormModal>
            <FormModal disabled={!(selected?.length === 1)} title="עדכן תפילה" >
                <PrayerForm pray={prayers.find(p => p.id == selected[0])} />
            </FormModal>
            <Button disabled={selected?.length === 0} variant='outlined' color='danger' name="delete Prayer"
                onClick={() => handlePrayer("deletePrayer", selected)}> מחק תפילה</Button>
        </GenericTable>
    </>
};

