import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Like from './like';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Budge from './budge';
import { Typography, Stack } from '@mui/joy';


export default function Message({ message, handleMessage, children, likes = true }) {
    return <>
        <Card variant='soft' orientation='horizontal' sx={{ bgcolor: "transparent", p: 2, width: "100%", maxWidth: 600 }}>
            <CardOverflow >
                <CardContent sx={{ justifyContent: "start", p: 0, m: 1, ml: 3 }}>
                    <Budge message={message} />
                </CardContent>
            </CardOverflow>
            <CardContent>
                {children}
                <CardActions  >
                    <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}><div>
                    {likes && <Like {...{ message, handleMessage }} />}
                    {handleMessage.edit && <EditIcon onClick={handleMessage.handleEdit} sx={{ border: "1px solid blue" }} color='primary' />}
                    {handleMessage.edit && <DeleteIcon onClick={(e) => { handleMessage.delete(message.post_id, e) }} sx={{ color: "red" }} />}
                    </div>
                    {message.category && <Typography level='body-sm'>קטגוריה: {message.category}</Typography>}
                    </Stack>
                </CardActions>
            </CardContent>
        </Card>


    </>

};
