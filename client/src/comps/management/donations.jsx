import { Button } from "@mui/joy";
import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import Table2 from "../muiComps/table2";
const heads = [
    {
        id: 'donation_id',
        numeric: false,
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'שם משתמש'
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'סכום'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'תאריך'
    },
    {
        id: 'payment_method',
        numeric: false,
        disablePadding: false,
        label: 'אופן התשלום'
    },
    {
        id: 'receipt',
        numeric: false,
        disablePadding: false,
        label: 'אסמכתא'
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'קטגוריה'
    }
]


export default function HandleDonations({ donations, setDonations, tableProps }) {
    return <>
        <Table2 {...{ tableProps, heads, data: donations, selected_id: "donation_id" }}>
        </Table2>
    </>
}