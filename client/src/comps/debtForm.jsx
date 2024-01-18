import { Button, Input } from "@mui/joy";
import { useInput } from "../hooks/input";
import { addDebt } from "../server/users";

export default function DebtForm({user_id}) {
    const amount = useInput(0);
    return<>
    <Input required type="number" {...amount} />
    <Button onClick={() => addDebt(amount.value, user_id)}>עדכן חוב</Button>
    
    </>
};
