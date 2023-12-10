import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardActions, CardContent, CardOverflow, Chip, Divider, Typography } from '@mui/joy';
import '../styles/message.css';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import {  CardActionArea } from '@mui/material';
import CommentForm from './commentForm';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

export default function Message({ }) {
    extendTheme({
        components: {
            JoyAccordion: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.variant === 'solid' &&
                  ownerState.clickable && {
                    color: 'rgba(255 255 255 / 0.72)',
                    '&:hover': {
                      color: 'black',
                    },
                  }),
              }),
            },
          },
        },
      });
      
      
    return <>
      
            <Accordion sx={{width: "fit-content"}}  variant="outlined" >
                <AccordionSummary>
                    <Card variant='plain' orientation='horizontal' sx={{ p: 1, maxWidth: 500 }}>
                        <CardOverflow >
                            <CardContent sx={{ justifyContent: "start", p:0, m: 0 }}>
                                <Avatar size='lg' sx={{ alignSelf: "center", p:0, mt:-1}}>ר</Avatar>
                                <Chip sx={{mt:-2}}>
                                    חבר קהילה
                                </Chip>
                            </CardContent>
                        </CardOverflow>

                        <CardContent>
                            {/* <CardActionArea> */}
                                <Typography level='title-md'>
                                    הזמנה לבר המצווה של בני שיחיה
                                </Typography>
                                <Typography level='body-sm'>
                                    נשמח לראותכם באירוע בר מצווה של בני שיחיה.
                                    תאריך: 10 באוגוסט 2022
                                    מקום: קהילת ישראל, רחוב הרצל 5, תל אביב
                                </Typography>
                            {/* </CardActionArea> */}
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
                <AccordionDetails variant='plain' sx={{width: "80%", m: "auto"}}>
                    מזל טוב לבני שיחיה ולמשפחה!
                    שיהיה בהצלחה!
                    שיהיה רק מזל טוב
                    <CommentForm />
                </AccordionDetails>
                <Divider />
                </Accordion>
               
       
    </>
}



