import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';

export default function Budge({ message: { username, role } }) {
    return <div style={{ width: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar variant="soft" color='primary' size='md' sx={{ alignSelf: "center", p: 0, mt: -1 }}>
            {username.slice(0, 2)}
        </Avatar>
        <Chip variant='soft' sx={{ mt: -1 }}>
            {role || "חבר קהילה"}
        </Chip>
    </div>

};
