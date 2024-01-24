import { IconButton, AspectRatio, Typography, Alert, Stack } from "@mui/joy"
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';



export default function GenericAlert({ title, body, setMessage}) {
    let icon, color;
    if (title === "success") {
        icon = <Check fontSize="xl2" />
        color = "success"
    } else if (title === "error") {
        icon = <Warning />
        color = "error"
    }


    return <>
        <Alert
            size="lg"
            color={color}
            variant="solid"
            invertedColors
            startDecorator={
                <AspectRatio
                    variant="solid"
                    ratio="1"
                    sx={{

                        minWidth: 40,
                        borderRadius: '50%',
                        boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                    }}
                >
                    <div>
                        {icon}
                    </div>
                </AspectRatio>
            }

            sx={{ margin: "auto", alignItems: 'flex-start', overflow: 'hidden', maxWidth: 400 }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
            <div>
                <Typography level="title-lg">{title}</Typography>
                <Typography level="body-sm">
                    {body}
                </Typography>
            </div>
            <div>
                
            <IconButton
                onClick={() => setMessage([])}
                    variant="plain"
                    sx={{
                        '--IconButton-size': '32px',
                        transform: 'translate(0.5rem, -0.5rem)',
                    }}
                >
                    <Close />
                </IconButton>
            </div>
            </Stack>
        </Alert>
    </>
};
