import { useMemo } from "react";
import Table2 from "../muiComps/table2";



export default function UsersHandler({ users, setUsers, selected, setSelected, tableProps }) {
    console.log("users", users);
    const heads = useMemo(()=>
    [
        {
            id: 'user_id',
            numeric: false,
            disablePadding: false,
            label: 'ID'
        },
        {
            id: 'username',
            numeric: false,
            disablePadding: false,
            label: 'username'
        },
        {
            id: 'first_name',
            numeric: false,
            disablePadding: false,
            label: 'שם פרטי'
        },
        {
            id: 'last_name',
            numeric: false,
            disablePadding: false,
            label: 'שם משפחה'
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'מייל'
        },
        {
            id: 'phone',
            numeric: false,
            disablePadding: false,
            label: 'פלאפון'
        },
        {
            id: 'street',
            numeric: false,
            disablePadding: false,
            label: 'רחוב'
        },
        {
            id: 'city',
            numeric: false,
            disablePadding: false,
            label: 'עיר'
        },
        {
            id: 'country',
            numeric: false,
            disablePadding: false,
            label: 'מדינה'
        },
        {
            id: 'zip',
            numeric: false,
            disablePadding: false,
            label: 'מיקוד'
        },
        {
            id: 'role',
            numeric: false,
            disablePadding: false,
            label: 'תפקיד'
        }
    ], [])
    return <>

        <Table2  {...{  heads, selected, setSelected }} rows={users} />
    </>
};
