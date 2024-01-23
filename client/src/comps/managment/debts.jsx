import { Input, Card, Button } from "@mui/joy";
import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import { useState } from 'react';
import { addDebt, newDebt } from "../../server/users";


export default function HandleDebts({ debts, setDebts, selected, setSelected, tableProps }) {
    const [input, setInput] = useState({});
    const [message, setMessage] = useState("")

    const handleChange = ({ target }) => {
        setInput(prev => ({ ...prev, [target.name]: target.value }))
    }

    const handleClick = async (action) => {
        try {
            let data;
            switch (action) {
                case "addDebt":
                    data = await addDebt(input.amount, selected[0]);
                    setDebts(prev => prev.map(debt => debt.debt_id == data.debt_id ? data : debt))
                    break;
                case "newDebt":
                      data = await newDebt(input.amount, input?.user_id);
                      console.log(data, "data");
                    setDebts(prev => [...prev, data])
                    break;
                default:
                    throw new Error("invalid action");
            }
            if(data instanceof Error) throw new Error(data.message)
            setMessage("החוב נוסף בהצלחה")
            setTimeout(() => setMessage(""), 3000)
        } catch (err) {
            console.log(err);
            setMessage(err.message)
            setTimeout(() => setMessage(""), 3000)

        }
    }

    return <>
        <GenericTable data={debts} {...tableProps} selectBy={"user_id"}
            heads={["ID", "מזהה משתמש", "סכום"]}>
            <FormModal setInput={setInput} message={message} title={"הוסף חוב"}>
                <Card>
                    <Input onChange={handleChange} required name='amount' type="number"  />
                    <Button variant='solid' color='primary' onClick={() => handleClick("addDebt")} > הוסף חוב</Button>
                </Card>
            </FormModal>
            <FormModal setInput={setInput} message={message} title={"חוב חדש"}>
                <Card>
                    <Input onChange={handleChange} required name='amount' type="number"  />
                    <Input onChange={handleChange} required name='user_id' type="number" />
                    <Button variant='solid' color='primary' onClick={() => handleClick("newDebt")} > הוסף חוב</Button>
                </Card>
            </FormModal>
        </GenericTable>
    </>
}