import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';



export default function ResponsiveTimePickers() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        
            <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
         
      </LocalizationProvider>
    );
  }