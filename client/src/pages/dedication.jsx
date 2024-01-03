import { Box, Button, Input, Card, Stack, Typography } from '@mui/joy';
import React from 'react';
import UserDetailsForm from '../comps/userDetailsForm';
import IconlessRadio from '../comps/radioFrom';
import dedicationBoard from '../assets/dedicationBoard.png';

import '../styles/dedication.css';
import Paypal from '../comps/paypal';

export default function Dedication(params) {
    return <>
        <Box display={'flex'} alignItems={'center'} justifyContent={"center"}>
            <Typography alignItems={'center'} level='h1' >דף הנצחה </Typography>
            <img src={dedicationBoard} alt="dedication board" width={150} height={150} />
        </Box>

        <Stack  direction={"column"} width={{ md: "95%", lg: "80%" }} margin={"auto"} spacing={2}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                useFlexGap
                margin={"auto"}
            >
                <UserDetailsForm update={false} />
                <IconlessRadio values={['לרפואה', 'פרנס היום', 'אזכרה']} />

            </Stack>
            <Card orientation='horizontal' sx={{ justifyContent: "center" }} variant='outlined' color="primary" >
                <Input sx={{ m: 1 }}></Input>
                <Input sx={{ m: 1 }}></Input>
                <Paypal />
            </Card>
        </Stack>



    </>

};


