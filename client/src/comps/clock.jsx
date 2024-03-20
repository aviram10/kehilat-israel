import { useEffect, useState } from 'react';
import Clock from 'react-clock';

export default function DigitalClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>sdfsdf</p>
      <Clock value={value} />
    </div>
  );
}