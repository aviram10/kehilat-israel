import { Card, Input } from '@mui/joy';
import {useState} from 'react';


export default function DonationForm(){
    const [input, setInput] = useState({})

    const handleChange = ({target}) => {
        setInput({...input, [target.name]:target.value})
    }

    
    return<>
    <Card>
    <Input required name='amount' type="number" value={input.amount}  />
    </Card>
    
    </>
}