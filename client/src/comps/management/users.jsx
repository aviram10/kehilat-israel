
import React, {  useMemo } from "react";
import { deleteUsers, manager } from '../../server/users'
import { Button } from "@mui/joy";
import GenericTable from "../muiComps/Table";

export default function HandleUsers({ setUsers, users, selected, setSelected, tableProps }) {
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
      <GenericTable data={data} {...tableProps}
                    heads={["ID", "שם משתמש", "שם פרטי", "שם משפחה", "מייל", "פלאפון", "רחוב", "עיר", "מדינה", "מיקוד", "תפקיד"]}>
                    
        <Button disabled={selected?.length === 0}
            variant='soft' color='primary' name="manager"
            onClick={() => {
                selected.forEach(user_id => manager(user_id)
                    .then(res => setUsers(prev => prev.map(user => user.user_id == user_id ? { ...user, role: "מנהל" } : { ...user })))
                    .catch(err => console.log(err)));
                setSelected([])
            }}
        > הגדר כמנהל
        </Button>
        <Button disabled={selected?.length === 0} variant='soft' color='danger' name="deleteUser"
            onClick={handleDeleteUsers}
        >השהה משתמש</Button>
        </GenericTable>
    </>

}