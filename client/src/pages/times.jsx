import React from 'react';
import DayTimes from '../comps/dayTimes';
import PrayersTimes from '../comps/prayersTimes';
import "../styles/times.css"

export default function Times({}) {
    
    
    return <div className='times'>
   <DayTimes />
   <PrayersTimes />
    </div>
};
