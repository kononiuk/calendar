import React, { useState, useEffect } from 'react';
import Month from './Month';

const Calendar: React.FC = () => {
  const [prevMonth, setPrevMonth] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date[]>([]);
  const [nextMonth, setNextMonth] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    setCurrentMonth(generateMonth(year, month));
    setPrevMonth(generateMonth(year, month - 1));
    setNextMonth(generateMonth(year, month + 1));
  }, [currentDate]);

  const generateMonth = (year: number, month: number): Date[] => {
    const result = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      result.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const mainStyle: React.CSSProperties = {
    backgroundColor: '#eeeff1',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px 12px 24px',
    backgroundColor: '#eeeff1',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#e3e4e6',
    color: 'black',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '0 4px',
    cursor: 'pointer',
    borderRadius: '4px',
    transitionDuration: '0.4s',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26), 0 2px 10px 0 rgba(0,0,0,0.16)',
    outline: 'none'
  };

  return (
    <div style={mainStyle}>
      <header style={headerStyle}>
        <button style={buttonStyle} onClick={handlePrevMonth}>Previous</button>
        <button style={buttonStyle} onClick={handleToday}>Today</button>
        <button style={buttonStyle} onClick={handleNextMonth}>Next</button>
        <h1 style={{ display: 'inline-block', fontSize: 24, margin: '0 0 0 auto', color: 'black' }}>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h1>
      </header>
      <Month days={currentMonth} prevMonthDays={prevMonth} nextMonthDays={nextMonth} />
    </div>
  );
};

export default Calendar;