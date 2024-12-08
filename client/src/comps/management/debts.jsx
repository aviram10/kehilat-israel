import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import { useState } from 'react';
import { payDebt, addDebt, newDebt } from "../../server/users";
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
        id: 'user_id',
        numeric: false,
        disablePadding: false,
        label: 'מזהה משתמש'
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'סכום'
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'שם משתמש'
    }
]


export default function HandleDebts({ debts, setDebts, tableProps, users }) {
    const { selected, setSelected } = tableProps;
    const [message, setMessage] = useState("")
    const handleDebt = async (action, input) => {
        try {
            console.log(action);
            let data;
            switch (action) {
                case "upsert":
                    data = await newDebt(input.amount, input?.user_id);
                    console.log("=====>data", data);
                    console.log(debts[0]);
                    setDebts(prev => {
                        const oldDebt = prev.find(debt => debt.debt_id == data?.debt_id);
                        if (oldDebt) {
                            oldDebt.debt = data?.debt
                            return prev
                        }
                        return [data, ...prev]
                    })
                    setMessage(["success", "החוב עודכן בהצלחה!"])
                    break;
                case "new":
                    data = await newDebt(input.amount, input?.user_id);
                    setDebts(prev => [data, ...prev])
                    break;
                case "pay":
                    data = await payDebt(input.amount, input?.user_id, input?.payment_method, input?.confirmation);
                    console.log("data", data);
                    setDebts(prev => prev.map(debt => debt.debt_id == data.debt_id ? { ...data, username: debt.username } : debt))
                    setMessage(["success", "החוב עודכן בהצלחה!"]);
                    break;
                default:
                    throw new Error("invalid action");
            }
            setTimeout(() => {
                setMessage("");
                setSelected([])
            }, 3000)
        } catch (err) {
            console.log(err);
            setMessage(["error", err?.response?.data?.message])
        }
    }
    const debt = debts?.find(d => d.user_id == selected[0]);
    return <>
        <Table2 {...{ tableProps, heads, data: debts, selected_id: "user_id" }}>
            <FormModal message={message} setMessage={setMessage} title={"הוסף חוב"}>
                <DebtForm action={"upsert"} handleDebt={handleDebt} debt={debt} users={users} />
            </FormModal>
            <FormModal message={message} title={"תשלום חוב"} setMessage={setMessage}>
                <DebtForm action={"pay"} handleDebt={handleDebt} debt={debt} users={users} />
            </FormModal>
        </Table2>
    </>
}