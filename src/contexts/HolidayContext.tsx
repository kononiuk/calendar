import React from 'react';

interface Holiday {
  date: string;
  name: string;
}

const HolidayContext = React.createContext<Holiday[]>([]);

export default HolidayContext;