import React, { useEffect, useState } from "react";

const formatTime = (date, format) => {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const tokens = {
    HH: String(hours24).padStart(2, "0"),
    hh: String(hours12).padStart(2, "0"),
    mm: String(minutes).padStart(2, "0"),
    ss: String(seconds).padStart(2, "0"),
  };

  return format.replace(/HH|hh|mm|ss/g, (match) => tokens[match]);
};

const DigitalClock = ({ config }) => {
  const { format = "HH:mm", showDate = false } = config || {};
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="digital-clock">
      <div className="digital-clock__time">{formatTime(now, format)}</div>
      {showDate && (
        <div className="digital-clock__date">
          {now.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}
    </div>
  );
};

export default DigitalClock;
