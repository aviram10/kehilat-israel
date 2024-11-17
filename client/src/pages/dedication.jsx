import { Box, Input, Card, Stack, Typography } from '@mui/joy';
import React, { useContext, useCallback, useEffect } from 'react';
import UserDetailsForm from '../comps/forms/userDetailsForm';
import IconlessRadio from '../comps/forms/radioFrom';
import dedicationBoard from '../assets/dedicationBoard.png';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'
import Cookies from 'js-cookie';

import '../styles/dedication.css';
import Paypal from '../comps/paypal';
import JewishCalender from '../comps/jewishCalender';
import useResize from '../hooks/useResize';

export default function Dedication(params) {
    const [name, setName] = useState("")
    const [type, setType] = useState("");
    const [details, setDetails] = useState({})
    const [date, setDate] = useState(DateTime.fromISO(new Date().toISOString()).toISODate());
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState();
    const [paypal, setPaypal] = useState("")
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const width = useResize();


    useEffect(() => {
        !Cookies.get("token") && navigate("/login", { state: { message: "you need to login", goto: "/dedication" } })
        return
    }, [navigate])

    useEffect(() => {
        setAmount(type === "פרנס היום" ? 250 : 100)
    }, [type, name, details, date])

    const handleUser = useCallback(user => {setDetails({ ...user }); setChanged(true)}, [])
    const success = data => { window.location.reload() }


    return <>
        <Box display={'flex'} alignItems={'center'} justifyContent={"center"}>
            <Typography alignItems={'center'} level='h1' >דף הנצחה </Typography>
            <img src={dedicationBoard} alt="dedication board" width={150} height={150} />
        </Box>
        <Stack justifyItems={"center"} direction={"column"} width={{ md: "95%", lg: "80%" }} margin={"auto"} spacing={2}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                useFlexGap
                margin={"auto"}
                alignItems={{xs: 'center', md:'stretch'}}
            >
                <UserDetailsForm
                    handleUser={handleUser}
                    user={user}
                />
                <IconlessRadio
                    
                    values={['לרפואה', 'פרנס היום', 'אזכרה']}
                    handleChange={({ target }) => {setType(target.value); setChanged(true)}}
                />
            </Stack>
            <Card orientation={width < 600 ? "vertical" : "horizontal"} sx={{ justifyContent: "center", alignItems: "center" }} variant='outlined' color="primary" >
                <Typography level='h3' > {type}</Typography>
                <Typography level='body-md' > שם</Typography>
                <Input
                    placeholder='שם להקדשה'
                    name='name'
                    onChange={({ target }) => { setName(target.value); setChanged(true) }}
                    sx={{ m: 1 }}>
                </Input>
                <Typography level='body-md' > סכום תרומה</Typography>
                <Input type='number' name='amount' value={amount}></Input>
                <Typography level='body-md' > תאריך</Typography>
                <JewishCalender handleChange={(date) => { setDate(DateTime.fromISO(new Date(date).toISOString()).toISODate()); setChanged(true) }} />
            </Card>
            <div style={{ width: "100%" }} onMouseEnter={() => { if(changed)  {setChanged(false); setPaypal(Math.random())}  }}>
                <Paypal key={paypal} set={setPaypal} date={date} amount={amount} name={name} details={details} type={type} success={success} />
            </div>
        </Stack>
    </>
};


