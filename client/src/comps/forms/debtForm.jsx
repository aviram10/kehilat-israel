import { Button, Input, TextField } from "@mui/material";
import { useState } from "react";

export default function DebtForm({debt, handleDebt}) {
    const action  = debt ? "add" : "new";
    const [input, setInput] = useState( {amount: 0, user_id: debt?.user_id || ""});
    const handleChange = ({ target }) => {
        setInput(prev => ({ ...prev, [target.name]: target.value }))
    }

    return<>
    <TextField required name="amount" label="סכום" value={input.amount} type="number" onChange={handleChange} />
    <TextField required label="user id" name="user_id" value={input.user_id} type="number" onChange={handleChange} />
    <Button variant="solid" color="primary" onClick={() => handleDebt(action, input)}>{debt ? "עדכן חוב" : "הוסף חוב"}</Button>
    </>
};
