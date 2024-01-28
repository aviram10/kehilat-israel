import { Button, Input } from "@mui/joy";
import { useState } from "react";

export default function DebtForm({debt, handleDebt}) {
    const action  = debt ? "add" : "new";
    const [input, setInput] = useState( {amount: 0, user_id: debt?.user_id || ""});
    const handleChange = ({ target }) => {
        setInput(prev => ({ ...prev, [target.name]: target.value }))
    }

    return<>
    <Input required name="amount" value={input.amount} type="number" onChange={handleChange} />
    <Input required name="user_id" value={input.user_id} type="number" onChange={handleChange} />
    <Button variant="solid" color="primary" onClick={() => handleDebt(action, input)}>{debt ? "עדכן חוב" : "הוסף חוב"}</Button>
    
    </>
};
