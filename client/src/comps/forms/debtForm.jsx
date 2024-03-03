import { Button, Input, TextField } from "@mui/material";
import { useState } from "react";

export default function DebtForm({ debt, handleDebt, action }) {
    console.log(action);
    const [input, setInput] = useState({ amount: "", user_id: debt?.user_id || "", payment_method: "", confirmation: ""});
    const handleChange = ({ target }) => {
        setInput(prev => ({ ...prev, [target.name]: target.value }))
    }

    return <>
        <TextField label="סכום" required name="amount" value={input.amount} type="number" onChange={handleChange} />
        <TextField label="מזהה משתמש" required name="user_id" value={input.user_id} type="number" onChange={handleChange} />
        {action === "pay" && <> <TextField label="אופן התשלום" required name="payment_method" value={input.payment_method} onChange={handleChange} />
            <TextField label="אסמכתא" required name="confirmation" value={input.confirmation} onChange={handleChange} /></>}
        <Button variant="solid" color="primary" onClick={() => handleDebt(action, input)}>{debt ? "עדכן חוב" : "הוסף חוב"}</Button>
    </>
};
