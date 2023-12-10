import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardActions, CardContent, CardOverflow, Chip, Typography } from '@mui/joy';
import '../styles/message.css';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import {  CardActionArea } from '@mui/material';
import CommentForm from './commentForm';

export default function Message({ }) {
    return <>
       
            <Accordion variant="soft" >
                <AccordionSummary>
                    <Card variant='soft' orientation='horizontal' sx={{ p: 1, maxWidth: 500 }}>
                        <CardOverflow >
                            <CardContent sx={{ justifyContent: "start", p:0, m: 0 }}>
                                <Avatar size='lg' sx={{ alignSelf: "center", p:0, mt:-1}}>ר</Avatar>
                                <Chip sx={{mt:-2}}>
                                    חבר קהילה
                                </Chip>
                            </CardContent>
                        </CardOverflow>

                        <CardContent>
                            <CardActionArea>
                                <Typography level='title-md'>
                                    הזמנה לבר המצווה של בני שיחיה
                                </Typography>
                                <Typography level='body-sm'>
                                    נשמח לראותכם באירוע בר מצווה של בני שיחיה.
                                    תאריך: 10 באוגוסט 2022
                                    מקום: קהילת ישראל, רחוב הרצל 5, תל אביב
                                </Typography>
                            </CardActionArea>
                            <CardActions>
                                <Chip>
                                    <SentimentVerySatisfiedIcon />

                                </Chip>
                                <Chip>
                                    פרטים
                                </Chip>
                            </CardActions>
                        </CardContent>
                    </Card>
                </AccordionSummary>
                <AccordionDetails>
                    מזל טוב לבני שיחיה ולמשפחה!
                    שיהיה בהצלחה!
                    שיהיה רק מזל טוב
                    <CommentForm />
                </AccordionDetails>
                </Accordion>
       
    </>
}



