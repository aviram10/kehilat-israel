import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import { useState } from 'react';
import { addDebt, newDebt } from "../../server/users";
import DebtForm from "../forms/debtForm";
import Table2 from "../muiComps/table2";

const heads = [
    {
        id: 'debt_id',
        numeric: false,
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'שם משתמש'
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'סכום'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'תאריך'
    }
]


export default function DebtsHandler({ debts, setDebts, tableProps }) {
    const {selected, setSelected} = tableProps;
    console.log(selected);
    const [message, setMessage] = useState("")
    const handleDebt = async (action, input) => {
        try {
            console.log(action);
            let data;
            switch (action) {
                case "add":
                    data = await addDebt(input);
                    setDebts(prev => prev.map(debt => debt.debt_id == data.data.debt_id ? {...data.data, username: debt.username} : debt))
                    setMessage(["success", "החוב עודכן בהצלחה!"])
                    break;
                case "new":
                      data = await newDebt(input.amount, input?.user_id);
                    setDebts(prev => [data.data, ...prev])
                    break;
                default:
                    throw new Error("invalid action");
            }
            setTimeout(() => setMessage(""), 3000)
        } catch (err) {
            console.log(err);
            setMessage(["error",err.response.data.message])
        }
    }
    return <>
        <Table2 {...{ tableProps, heads, data: debts, selected_id: "debt_id" }}>
            <FormModal disabled={selected.length == 0}  message={message} setMessage={setMessage} title={"הוסף חוב"}>
                <DebtForm handleDebt={handleDebt} debt={debts?.find(d => d.debt_id == selected[0])} />
            </FormModal>
            <FormModal  message={message} title={"חוב חדש"} setMessage={setMessage}>
               <DebtForm handleDebt={handleDebt} />
            </FormModal>
        </Table2>
    </>
}