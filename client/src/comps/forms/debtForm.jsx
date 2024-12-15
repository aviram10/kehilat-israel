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
            disablePortal
            options={users?.map(user => ({ label: user?.username, ...user }))}
            value={users?.find?.(user => user.user_id === input.user_id)?.username}
            sx={{ width: 300, direction: 'ltr' }}
            renderInput={(params) => <TextField {...params} label="שם משתמש" />}
            onChange={(event, val) => {
                setInput(prev => ({ ...prev, user_id: val.user_id })
                )
            }}
            isOptionEqualToValue={(option, val) => {
                return option?.username === val?.username || option?.username === val
            }}
        />

        {action === "pay" && <> <TextField label="אופן התשלום" required name="payment_method" value={input.payment_method} onChange={handleChange} />
            <TextField label="אסמכתא" required name="confirmation" value={input.confirmation} onChange={handleChange} />
        </>}
        <Button variant='contained' color='primary' onClick={() => {
            handleDebt(action, input)
        }}>{"עדכן חוב"}</Button>
    </>
};
