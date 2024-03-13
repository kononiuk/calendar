import React from 'react';

/**
 * Interface for Holiday
 * @interface
 * @property {string} name - The name of the holiday
 */
interface Holiday {
  name: string;
}

/**
 * Interface for HolidaysProps
 * @interface
 * @property {Holiday[]} matchingHolidays - The holidays that match a specific condition
 */
interface HolidaysProps {
  matchingHolidays: Holiday[];
}

/**
 * Holidays component displays a list of holidays that match a specific condition.
 * 
 * @param {HolidaysProps} props - The properties that define the holidays to be displayed.
 */
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