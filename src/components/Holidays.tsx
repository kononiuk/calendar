import React from 'react';

interface Holiday {
  name: string;
}

interface HolidaysProps {
  matchingHolidays: Holiday[];
}

const Holidays: React.FC<HolidaysProps> = ({ matchingHolidays }) => {
  return (
    <div>
      {matchingHolidays.map((holiday, index) => (
        <div key={index}>{holiday.name}</div>
      ))}
    </div>
  );
};

export default Holidays;