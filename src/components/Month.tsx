import React from 'react';
import Day from './Day';

interface DayData {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isLast: boolean;
  isFirst: boolean;
}

interface MonthProps {
  days: Date[];
  prevMonthDays?: Date[];
  nextMonthDays?: Date[];
  searchText?: string;
}

const Month: React.FC<MonthProps> = ({ days, prevMonthDays, nextMonthDays, searchText }) => {
  const headerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  };

  const gridStyle: React.CSSProperties = {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridAutoRows: '1fr',
    gap: '4px',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    height: '100%',
    marginTop: '4px',
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfWeek = days.length > 0 ? days[0].getDay() : 0;
  const lastDayOfWeek = days.length > 0 ? days[days.length - 1].getDay() : 0;

  const prevMonthDaysToShow = prevMonthDays && !!firstDayOfWeek ? prevMonthDays.slice(-firstDayOfWeek) : [];
  const nextMonthDaysToShow = nextMonthDays ? nextMonthDays.slice(0, 6 - lastDayOfWeek) : [];

  const allDays: DayData[] = [
    ...prevMonthDaysToShow.map((date, index) => ({
      date,
      isToday: date.getTime() === today.getTime(),
      isCurrentMonth: false,
      isLast: index === prevMonthDaysToShow.length - 1,
      isFirst: false
    })),
    ...days.map((date, index) => ({
      date,
      isToday: date.getTime() === today.getTime(),
      isCurrentMonth: true,
      isLast: index === days.length - 1,
      isFirst: index === 0
    })),
    ...nextMonthDaysToShow.map((date, index) => ({
      date,
      isToday: date.getTime() === today.getTime(),
      isCurrentMonth: false,
      isLast: false,
      isFirst: index === 0
    }))
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={headerStyle}>
        {daysOfWeek.map((dayName, index) => (
          <div key={index} style={{ backgroundColor: '#eeeff1', padding: '4px' }}>
            {dayName}
          </div>
        ))}
      </div>
      <div style={gridStyle}>
        {allDays.map((day, index) => (
          <div key={index} style={{ backgroundColor: day.isCurrentMonth ? '#e3e4e6' : '#ebebeb', minWidth: 0, overflowY: 'auto' }}>
            <Day key={index + 7} day={day} searchText={searchText || ''} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;