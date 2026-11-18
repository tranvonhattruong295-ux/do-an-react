import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(() => new Date().toTimeString().split(' ')[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      <span className="clock__indicator"></span>
      <span className="clock__time">{time}</span>
    </div>
  );
}