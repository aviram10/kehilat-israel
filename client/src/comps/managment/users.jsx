
import React from "react";
import { deleteUsers, manager } from '../../server/users'
import { Button } from "@mui/joy";


export default function HandleUsers({ users, setUsers, selected, setSelected }) {
    

    const handleDeleteUsers = async () => {
        console.log("deleteUsers");
        const results = await deleteUsers(selected)
        results.forEach((result) => {
            console.log(result);
            result.status === "fulfilled" &&
                setUsers(prev => prev.map(user => user.user_id == result.value.data ? { ...user, role: "לא פעיל" } : { ...user })
                .sort((a, b) => a.role === "לא פעיל" ? 1 : -1)
                .sort((a, b) => a.role === "מנהל" ? -1 : 1))
        })
        setSelected([])
    }
    return <>
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
    </>

}