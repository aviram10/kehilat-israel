import React from 'react';
import DayTimes from '../comps/dayTimes';
import PrayersTimes from '../comps/prayersTimes';
import "../styles/times.css"

export default function Times({times}) {
    
    
    return <div className=''>
   <DayTimes times={times.dayTimes} />
   <PrayersTimes times={times.prayers} />
    </div>
};
