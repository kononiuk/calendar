import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import Loader from './utils/Loader';
import HolidayContext from './contexts/HolidayContext';
import TasksProvider from './contexts/TasksProvider';
import LabelsProvider from './contexts/LabelsProvider';

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
 * App component is the root component of the application.
 * It fetches the holidays data, provides the Tasks and Labels contexts, and renders the Calendar component.
 */
function App() {
  const HOLIDAYS_API_URL = 'https://date.nager.at/api/v3/NextPublicHolidaysWorldwide';
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(HOLIDAYS_API_URL)
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
      <LabelsProvider>
        <HolidayContext.Provider value={holidays}>
          <div className="App">
            <Calendar />
          </div>
        </HolidayContext.Provider>
      </LabelsProvider>
    </TasksProvider>
  );
}

export default App;