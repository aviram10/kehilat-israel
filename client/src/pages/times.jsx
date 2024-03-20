import React from 'react';
import DayTimes from '../comps/dayTimes';
import PrayersTimes from '../comps/prayersTimes';
import "../styles/times.css"
import DigitalClock from '../comps/clock';

export default function Times({ times }) {


    return<div class="container">
    <div class="navbar"></div>
    <div class="weekday">
      <div class="dayInfo"></div>
      <div class="dailyPrayers"><PrayersTimes times={times.prayers} isDaily={true}/></div>
    </div>
    <div class="shabbat">
      <div class="shbbatInfo"></div>
      <div class="shabbatPrayers"><PrayersTimes times={times.prayers} isDaily={false}/></div>
    </div>
    <div class="info">
      <div class="clock"> <DigitalClock /></div>
      <div class="title"></div>
    </div>
    <div class="times"></div>
    <div class="dedication"></div>
    <div class="commissiner"></div>
  </div>
};
