import { Box, Input, Card, Stack, Typography } from '@mui/joy';
import React, { useContext, useCallback, useEffect } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import IconlessRadio from '../comps/radioFrom';
import dedicationBoard from '../assets/dedicationBoard.png';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'

import '../styles/dedication.css';
import Paypal from '../comps/paypal';
import JewishCalender from '../comps/jewishCalender';

export default function Dedication(params) {
    console.log("dedication");
    const [name, setName] = useState("")
    const [type, setType] = useState("");
    const [details, setDetails] = useState({})
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState();
    const [paypal, setPaypal] = useState("")
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    useEffect(() => {
        !sessionStorage.user_id && navigate("/login")
        return
    }, [navigate])

    useEffect(() => {
        setAmount(type === "פרנס היום" ? 250 : 100)
        setPaypal(prev => prev + 1)
    }, [type, name, details, date])

    const handleUser = useCallback(user => setDetails({ ...user }), [])
    const success = data => { }

    const handleError = () => {
        console.log("handleError");
        setPaypal(prev => prev + 1)
    }

    return <>
        <Typography alignItems={'center'} level='h1' >דף הנצחה </Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={"center"}>
            <img src={dedicationBoard} alt="dedication board" width={150} height={150} />
        </Box>
        <Stack justifyItems={"center"} direction={"column"} width={{ md: "95%", lg: "80%" }} margin={"auto"} spacing={2}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                useFlexGap
                margin={"auto"}
            >
                <UserDetailsForm
                    handleUser={handleUser}
                    user={user}
                />
                <IconlessRadio
                    values={['לרפואה', 'פרנס היום', 'אזכרה']}
                    handleChange={({ target }) => setType(target.value)}
                />
            </Stack>
            <Card orientation='horizontal' sx={{ justifyContent: "center", alignItems: "center" }} variant='outlined' color="primary" >
                <Typography level='h3' > {type}</Typography>
                <Input
                    placeholder='שם להקדשה'
                    name='name'
                    onBlur={({ target }) => { setName(target.value) }}
                    sx={{ m: 1 }}>
                </Input>
                <JewishCalender handleChange={(date) => setDate(DateTime.fromISO(new Date(date).toISOString()).toISODate())} />
                <Input type='number' name='amount' value={amount}></Input>
            </Card>
            <div onClick={()=>{console.log("onClick");}} >
            <Paypal key={paypal}  handleError={handleError} date={date} amount={amount} name={name} details={details} type={type} success={success} />
            </div>        
        </Stack>
    </>


};


