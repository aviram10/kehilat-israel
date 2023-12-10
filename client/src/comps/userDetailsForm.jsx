import React from 'react';
import { Grid, Stack, Sheet, Typography, Input } from '@mui/joy';

export default function UserDetailsForm() {
    const [editMode, setEditMode] = React.useState(true);

    return (
        <Sheet  variant='soft'>
                <Stack >
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
                           { editMode ? <Input value={"אבי"} required></Input> : <Typography level='body-lg'>אבי</Typography>}
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                שם משפחה
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                        { editMode ? <Input value={"רם"} required></Input> : <Typography level='body-lg'>רם</Typography>}
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                פלאפון
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                        { editMode ? <Input value={"0527128119"} required></Input> : <Typography level='body-lg'>0527128119</Typography>}
                        </Grid>
                        <Grid xs={4}>
                            <Typography level='body-lg'>
                                אימייל
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                        { editMode ? <Input value={"avi@gmail.com"} required></Input> : <Typography level='body-lg'>avi@gmail.com</Typography>}
                        </Grid>
                    </Grid>
                </Stack>
            </Sheet>
    );
}

