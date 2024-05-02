import React from 'react';
import './style.css';

const Schedule = () => {
  return (
    <div className="schedule">
      <h1>בית הכנסת ניכוהם שלום</h1>
      <h2>דחוש שתת ספעם ת'ש"פ - א' דפסח 19:36:37</h2>
      <div className="times">
        <div className="section">
          <h3>שעות היום</h3>
          <p>עלות השחר 5:00 בבוקר</p>
          <p>זמן טבילת כלים 8:00 בבוקר</p>
          <p>שקיעת החמה 4:00 בערב</p>
        </div>
        <div className="section">
          <h3>זמני היום</h3>
          <p>הנץ החמה 6:33</p> 
          <p>סוף זמ"ש מג"א 8:53</p>
          <p>סוף זמ"ש גר"א 10:10</p>
          <p>שקה"ח גר"א 10:41</p>
          <p>חצות היום 12:45</p>
          <p>מנחה גדולה 13:15</p>
        </div>
        <div className="section">
          <h3>לוח שעות בוקר וערב</h3>
          <p>א' שחרית 7:00</p>
          <p>ב' שחרית 8:15</p>
          <p>מנחה 16:15</p>
          <p>ערבית 19:15</p>
        </div>
        <div className="section">
          <h3>שקיעת החמה</h3>
          <p>תחילת שקיעה 16:22</p>
          <p>שקיעה 19:00</p>
        </div>
        <div className="section">
          <h3>צאת הכוכבים</h3>
          <p>צאת הכוכבים א' 19:37</p>
          <p>צאת הכוכבים ב' 20:00</p>
          <p>חצות הלילה 0:45</p>
          <p>עלות השחר 4:22</p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;