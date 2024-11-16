import { Button, Input, TextField } from "@mui/material";
import { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';


export default function DebtForm({ debt, handleDebt, action, users }) {
    const [input, setInput] = useState({ amount: "", user_id: debt?.user_id || "", payment_method: "", confirmation: "" });
    const handleChange = ({ target }) => {
        setInput(prev => ({ ...prev, [target.name]: target.value }))
    }

    return <>
        <TextField dir="ltr" label="סכום" required name="amount" value={input.amount} type="number" onChange={handleChange} />
        <Autocomplete
        dir="ltr"
        required
        inputValue={users.find(user => user?.user_id == debt?.user_id)?.username || ""}
            disablePortal
            options={users.map(user => ({ label: user.username, ...user }))}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="שם משתמש" />}
            onChange={(event, val) => setInput(prev => ({...prev, user_id: val.user_id}))}
        />

        {action === "pay" && <> <TextField label="אופן התשלום" required name="payment_method" value={input.payment_method} onChange={handleChange} />
            <TextField label="אסמכתא" required name="confirmation" value={input.confirmation} onChange={handleChange} /></>}
        <Button variant="solid" color="primary" onClick={() => handleDebt(action, input)}>{debt ? "עדכן חוב" : "הוסף חוב"}</Button>
    </>
};
