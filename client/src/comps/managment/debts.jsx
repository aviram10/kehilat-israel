import { Input, Card, Button } from "@mui/joy";
import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import {useState} from 'react'; 
import {addDebt} from "../../server/users";


export default function HandleDebts({debts, setDebts, selected, setSelected, tableProps}) {
    const [amount, setAmount] = useState(0);

    const handleChange = ({target}) => {
        setAmount(target.value)
    }

    const handleClick = async () => {
        const data = await addDebt(amount, selected[0]);
        setDebts(prev => prev.map(debt => debt.debt_id == data.debt_id ? data : debt))
    }

    return <>
        <GenericTable data={debts} {...tableProps} selectBy={"user_id"}
            heads={["ID", "מזהה משתמש", "סכום"]}>
               <FormModal title={"הוסף חוב"}>
                    <Card>
                        <Input onChange={handleChange} required name='amount' type="number" value={amount}  />
                        <Button variant='solid' color='primary' onClick={handleClick} > הוסף חוב</Button>
                    </Card>
               </FormModal>
        </GenericTable>
    </>
}