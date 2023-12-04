import React from "react";

export default function PrayerTime({name, time}) {
    return <tr>
        <td>{name}</td>
        <td>{time}</td>
    </tr>
};
