import "react-jewish-datepicker/dist/index.css";
import { useEffect, useState } from "react";
import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import "../styles/calender.css"

export default function JewishCalender({ handleChange, date }) {
  const [basicJewishDay, setBasicJewishDay] = useState();
  useEffect(() => {
    if (basicJewishDay)
      handleChange(basicJewishDay?.date)
  }, [basicJewishDay])

  return (
    <ReactJewishDatePicker
      value={date}
      isHebrew
      onClick={(day) => {
        setBasicJewishDay(day);
      }}
    />
  );
}