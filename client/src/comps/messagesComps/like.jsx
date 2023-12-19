import React, { useEffect, useMemo } from 'react';
import Chip from '@mui/joy/Chip';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { toggleLike } from "../../functions/server"


export default function Like({ message }) {
    const [liked, setLiked] = React.useState(message.liked);
    useEffect(() => {
        setLiked(message.liked)
    }, [message])

    const handleLike = async (e) => {
        e.stopPropagation();
        const result = await toggleLike(message.message_id);
        if (result){ 
            message.likes += liked ? -1 : 1;
            setLiked(!liked)
        }
    }
    const color = useMemo(() => {
        return liked ? "purple" : ""
    }, [liked])
    return <>
        <Chip  color="neutral" sx={{ '& span': { display: "flex", alignItems: "center" }, color: { color } }}>
            {message.likes}
            <SentimentVerySatisfiedIcon onClick={handleLike} sx={{ color: { color } }} />
        </Chip>
    </>
};
