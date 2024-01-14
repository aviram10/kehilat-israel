import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';

export default function Actions({children}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
        sx={{color:"white"}}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement='top-end'>
        {children}
        {/* <MenuItem>test</MenuItem>
        <MenuItem>test</MenuItem>
        <MenuItem>test</MenuItem> */}
      </Menu>
    </Dropdown>
  );
}