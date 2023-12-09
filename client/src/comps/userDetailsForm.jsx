import React from 'react';
import { Grid, Stack, Sheet, Typography, Input } from '@mui/joy';

export default function UserDetailsForm() {
    return (
        <Sheet variant='soft'>
                <Stack>
                    <Typography level='title-lg' textAlign={"center"}>
                        פרטים אישיים
                    </Typography>
                    <Grid container sx={{m: 2}} spacing={2} >
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                שם פרטי
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Input required></Input>
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
                                פלאפון
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Input  required type='tel'></Input>
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                אימייל
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Input required type='email'></Input>
                        </Grid>
                    </Grid>
                </Stack>
            </Sheet>
    );
}

