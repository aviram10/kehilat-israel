import "react-jewish-datepicker/dist/index.css";
import { useEffect, useState } from "react";
import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import "../styles/calender.css"

export default function JewishCalender({handleChange}) {
  const [basicJewishDay, setBasicJewishDay] = useState();
  useEffect(()=>{
    handleChange(basicJewishDay?.date)
  },[basicJewishDay])
  
  return (
    <ReactJewishDatePicker
      value={new Date()}
      isHebrew
      onClick={(day) => {
        setBasicJewishDay(day);
        // console.log(day);
      }}
    />
  );
}