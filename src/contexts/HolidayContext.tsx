import React from 'react';

/**
 * Interface for Holiday
 * @interface
 * @property {string} date - The date of the holiday
 * @property {string} name - The name of the holiday
 */
interface Holiday {
  date: string;
  name: string;
}

/**
 * HolidayContext is a React context for the holidays data.
 * It provides a way to pass the holidays data through the component tree without having to pass props down manually at every level.
 */
const HolidayContext = React.createContext<Holiday[]>([]);

export default HolidayContext;