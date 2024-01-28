import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";
import { useState } from 'react';
import { addDebt, newDebt } from "../../server/users";
import DebtForm from "../forms/debtForm";


export default function HandleDebts({ debts, setDebts, selected, setSelected, tableProps }) {
    const [message, setMessage] = useState("")
    console.log(debts);


    const handleDebt = async (action, input) => {
        try {
            console.log(input.amount, input.user_id);
            let data;
            switch (action) {
                case "add":
                    data = await addDebt(input);
                    setDebts(prev => prev.map(debt => debt.debt_id == data.data.debt_id ? data.data : debt))
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
        <GenericTable data={debts} {...tableProps} selectBy={"user_id"}
            heads={["ID", "מזהה משתמש", "סכום"]}>
            <FormModal  message={message} setMessage={setMessage} title={"הוסף חוב"}>
                <DebtForm handleDebt={handleDebt} debt={debts?.find(d => d.user_id == selected[0])} />
            </FormModal>
            <FormModal  message={message} title={"חוב חדש"} setMessage={setMessage}>
               <DebtForm handleDebt={handleDebt} />
            </FormModal>
        </GenericTable>
    </>
}