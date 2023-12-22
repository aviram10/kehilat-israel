import Chip from '@mui/joy/Chip';
import GradeSharpIcon from '@mui/icons-material/GradeSharp';



export default function Like({params: { message, handleMessage }}) {

    const handleLike = async (e) => {
        e.stopPropagation();
        handleMessage.toggleLike(message.message_id)
    }
    const color = message.liked ? "red" : "";
 
    return <>
        <Chip color="neutral" sx={{ '& span': { display: "flex", alignItems: "center" }, color: { color } }}>
            {message.likes}
            <GradeSharpIcon onClick={handleLike} sx={{color:color}} />
        </Chip>
    </>
};
