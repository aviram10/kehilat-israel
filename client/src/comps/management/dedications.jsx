
import Table2 from "../muiComps/table2";
//[id, user id, date, name, type]
const heads = [
    {
        id: 'donation_id',
        numeric: false,
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'donation id',
        numeric: false,
        disablePadding: false,
        label: 'מזהה תרומה '
    },
    {
        id: 'user_id',
        numeric: false,
        disablePadding: false,
        label: 'מזהה משתמש'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'תאריך'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'שם'
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'סוג'
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: ' שם משתמש'
    }
    
]


export default function DedicationHandler({ dedications, setDedications, tableProps }) {
    return <>
        <Table2 {...{ tableProps, heads, data: dedications, selected_id: "dedication_id" }}>
        </Table2>
    </>
}