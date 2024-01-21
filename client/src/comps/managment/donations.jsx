import { Button } from "@mui/joy";
import GenericTable from "../muiComps/Table";
import FormModal from "../muiComps/formModal";


export default function HandleDonations({ donations, setDonations, selected, setSelected, tableProps }) {
    return <>
        <GenericTable data={donations} {...tableProps}
            heads={["ID", "שם משתמש", "סכום", "תאריך", "אופן התשלום", "אסמכתא", "קטגוריה"]}>
               <FormModal>
                    
               </FormModal>
        </GenericTable>
    </>
}