import { Box, Input, Card, Stack, Typography } from '@mui/joy';
import React, { useCallback, useEffect } from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import IconlessRadio from '../comps/radioFrom';
import dedicationBoard from '../assets/dedicationBoard.png';
import { useState } from 'react';
import { DateTime } from 'luxon'

import '../styles/dedication.css';
import Paypal from '../comps/paypal';
import LoginForm from '../comps/loginForm';
import JewishCalender from '../comps/jewishCalender';

export default function Dedication(params) {
    const [name, setName] = useState("")
    const [type, setType] = useState("");
    const [details, setDetails] = useState({})
    const [date, setDate] = useState("");

    useEffect(() => {
        console.log(name, type, details, date);
    }, [name, type, details, date])

    const handleUser = useCallback(user => setDetails({ ...user }), [])

    return <>
        <Typography alignItems={'center'} level='h1' >דף הנצחה </Typography>
        {!sessionStorage.user_id ? <LoginForm />
            : <> <Box display={'flex'} alignItems={'center'} justifyContent={"center"}>
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
                            update={false}
                        />
                        <IconlessRadio
                            values={['לרפואה', 'פרנס היום', 'אזכרה']}
                            handleChange={({ target }) => setType(target.value)}
                        />

                    </Stack>
                    <Card orientation='horizontal' sx={{ justifyContent: "center" }} variant='outlined' color="primary" >
                        <Input
                            placeholder='שם להקדשה'
                            name='name'
                            onChange={({ target }) => { setName(target.value) }}
                            value={name}
                            sx={{ m: 1 }}>

                        </Input>
                        <JewishCalender handleChange={(date) => setDate(DateTime.fromISO(new Date(date).toISOString()).toISODate())} />
                    </Card>
                    <Paypal />
                </Stack>
            </>}
    </>

};


