import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import Loader from './utils/Loader';
import HolidayContext from './contexts/HolidayContext';
import TasksProvider from './contexts/TasksProvider';
import './App.css';

interface Holiday {
  date: string;
  name: string;
}

function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide')
      .then(response => response.json())
      .then(data => {
        const parsedHolidays: Holiday[] = [];
        data.forEach((holiday: any) => {
          if (!parsedHolidays.find(h => h.name === holiday.name)) {
            parsedHolidays.push({ date: holiday.date, name: holiday.name });
          }
        });
        setHolidays(parsedHolidays);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TasksProvider>
      <HolidayContext.Provider value={holidays}>
        <div className="App">
          <Calendar />
        </div>
      </HolidayContext.Provider>
    </TasksProvider>
  );
}

export default App;