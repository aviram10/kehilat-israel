import React from 'react';
import { Accordion, Avatar, Card, CardActions, CardContent, CardOverflow, Chip, Divider, Typography } from '@mui/joy';
import '../styles/message.css';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CommentForm from './commentForm';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';

export default function Message({ }) {

    return <>
        <Accordion 
            sx={{
                maxWidth: 603,
                borderRadius: 'lg',
                [`& .${accordionSummaryClasses.button}:hover`]: {
                  bgcolor: 'transparent',
                },
                [`& .${accordionDetailsClasses.content}`]: {
                  boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                  [`&.${accordionDetailsClasses.expanded}`]: {
                    paddingBlock: '0.75rem',
                  },
                },
              }}
        >
            <AccordionSummary>
                <Card variant='plain' orientation='horizontal' sx={{ p: 1, maxWidth: 500 }}>
                    <CardOverflow >
                        <CardContent sx={{ justifyContent: "start", p: 0, m: 0 }}>
                            <Avatar size='lg' sx={{ alignSelf: "center", p: 0, mt: -1 }}>ר</Avatar>
                            <Chip sx={{ mt: -2 }}>
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
            <AccordionDetails variant='soft'>
                מזל טוב לבני שיחיה ולמשפחה!
                שיהיה בהצלחה!
                שיהיה רק מזל טוב
                <CommentForm />
            </AccordionDetails>
            {/* <Divider /> */}
        </Accordion>


    </>
}



