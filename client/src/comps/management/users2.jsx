import { useMemo } from "react";
import Table2 from "../muiComps/table2";
import { Button } from "@mui/joy";
import { deleteUsers, manager } from '../../server/users'

const heads =
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
            label: 'שם משתמש'
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
    ]


export default function UsersHandler({ users, setUsers, tableProps}) {
    const {selected, setSelected} = tableProps;
    
    const handleDeleteUsers = async () => {
        const results = await deleteUsers(selected)
        results.forEach((result) => {
            result.status === "fulfilled" &&
                setUsers(prev => prev.map(user => user.user_id == result.value.data ? { ...user, role: "לא פעיל" } : { ...user }))
        })
        setSelected([])
    }
    const data = useMemo(()=>  users.sort((a, b) => a.role === "לא פעיל" ? 1 : -1)
    .sort((a, b) => a.role === "מנהל" ? -1 : 1) ,[users])
    return <>

        <Table2  {...{  heads, tableProps, data, selected_id: "user_id" }}  >
        <Button disabled={selected?.length === 0}
            variant='solid' color='primary' name="manager"
            // sx={{backgroundColor: "white"}}
            onClick={() => {
                selected.forEach(user_id => manager(user_id)
                    .then(res => setUsers(prev => prev.map(user => user.user_id == user_id ? { ...user, role: "מנהל" } : { ...user })))
                    .catch(err => console.log(err)));
                setSelected([])
            }}
        > הגדר כמנהל
        </Button>
        <Button disabled={selected?.length === 0} variant='solid' color='danger' name="deleteUser"
        // sx={{backgroundColor: "white"}}
            onClick={handleDeleteUsers}
        >השהה משתמש</Button>
        </Table2>
    </>
};
