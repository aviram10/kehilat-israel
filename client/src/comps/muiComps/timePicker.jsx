import * as React from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {DateTime} from 'luxon'

export default function TimePick({selectTime, time}) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
        <TimePicker
        defaultValue={time ? DateTime.fromISO(time) : null}
        closeOnSelect={false}
        onAccept={selectTime}
        sx={{direction: "ltr"}}
          label="בחר זמן"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
    </LocalizationProvider>
  );
}