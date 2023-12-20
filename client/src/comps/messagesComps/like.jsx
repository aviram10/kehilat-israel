import Chip from '@mui/joy/Chip';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { toggleLike } from "../../functions/server"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GradeSharpIcon from '@mui/icons-material/GradeSharp';



export default function Like({params: { message, handleSuccess }}) {
    // const [liked, setLiked] =useState(message.liked);
    // useEffect(() => {
    //     setLiked(message.liked)
    // }, [message])

    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            const result = await toggleLike(message.message_id);
            if (result)
                handleSuccess(message)
        } catch (e) {
            console.log(e)
        }
    }
    const color = message.liked ? "red" : "";
    // const color = useMemo(() => {
    //     return liked ? "purple" : ""
    // }, [liked])
    return <>
        <Chip color="neutral" sx={{ '& span': { display: "flex", alignItems: "center" }, color: { color } }}>
            {message.likes}
            <GradeSharpIcon onClick={handleLike} sx={{color:color}} />
        </Chip>
    </>
};
