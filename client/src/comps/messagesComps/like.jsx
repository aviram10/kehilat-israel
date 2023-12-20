import Chip from '@mui/joy/Chip';
import { toggleLike } from "../../functions/server"
import GradeSharpIcon from '@mui/icons-material/GradeSharp';



export default function Like({params: { message, handleMessage }}) {

    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            const result = await toggleLike(message.message_id);
            if (result && handleMessage.handleSuccess)
            handleMessage.handleSuccess(message)
        } catch (e) {
            console.log(e)
        }
    }
    const color = message.liked ? "red" : "";
 
    return <>
        <Chip color="neutral" sx={{ '& span': { display: "flex", alignItems: "center" }, color: { color } }}>
            {message.likes}
            <GradeSharpIcon onClick={handleLike} sx={{color:color}} />
        </Chip>
    </>
};
