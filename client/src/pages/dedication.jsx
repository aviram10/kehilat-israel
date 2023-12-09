import { Grid, Input, Sheet, Stack, Typography } from '@mui/joy';
import React from 'react';

export default function Dedication(params) {
    return <Grid container sx={{ m: 2 }} >
        <Grid xs={6} >
            <Sheet variant='soft'>
                <Stack>
                    <Typography level='h2' textAlign={"center"}>
                        פרטים אישיים
                    </Typography>
                    <Grid container sx={{m: 2}} spacing={2} >
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                שם
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Input></Input>
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                שם משפחה
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Input></Input>
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                אימייל
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Input type='email'></Input>
                        </Grid>
                    </Grid>
                </Stack>
            </Sheet>
        </Grid>
    </Grid >
};


