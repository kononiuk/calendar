import React from 'react';
import styled from 'styled-components';
import Day from './Day';

/**
 * Interface for DayData
 * @interface
 * @property {Date} date - The date of the day
 * @property {boolean} isToday - Whether the day is today
 * @property {boolean} isCurrentMonth - Whether the day is in the current month
 * @property {boolean} isLast - Whether the day is the last day in its month
 * @property {boolean} isFirst - Whether the day is the first day in its month
 */
interface DayData {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isLast: boolean;
  isFirst: boolean;
}

/**
 * Interface for MonthProps
 * @interface
 * @property {Date[]} days - The days in the month
 * @property {Date[]} prevMonthDays - The days in the previous month
 * @property {Date[]} nextMonthDays - The days in the next month
 * @property {string} searchText - The text to search for
 */
interface MonthProps {
  days: Date[];
  prevMonthDays?: Date[];
  nextMonthDays?: Date[];
  searchText?: string;
}

/**
 * Interface for DayContainerProps
 * @interface
 * @property {boolean} $isCurrentMonth - Whether the day is in the current month
 */
interface DayContainerProps {
  $isCurrentMonth: boolean;
}

/**
 * MonthWrap is a styled component that wraps the entire month.
 */
const MonthWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
`;

/**
 * MonthHeader is a styled component that represents the header of the month.
 */
const MonthHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  justify-content: space-around;
`;

/**
 * MonthHeaderDay is a styled component that represents a day in the month header.
 */
const MonthHeaderDay = styled.div`
  background-color: #eeeff1;
  padding: 4px;
`;

/**
 * Grid is a styled component that represents the grid of days in the month.
 */
const Grid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  gap: 4px;
  align-items: stretch;
  justify-content: space-around;
  height: 100%;
  margin-top: 4px;
`;

/**
 * DayContainer is a styled component that represents a container for a day.
 * @property {boolean} $isCurrentMonth - Whether the day is in the current month
 */
const DayContainer = styled.div<DayContainerProps>`
  background-color: ${(props) => (props.$isCurrentMonth ? '#e3e4e6' : '#ebebeb')};
  min-width: 0;
  overflow-y: auto;
`;

/**
 * Month component displays a calendar month with days.
 * 
 * @param {MonthProps} props - The properties that define the month and its days.
 */
const Month: React.FC<MonthProps> = ({ days, prevMonthDays, nextMonthDays, searchText }) => {
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
    <MonthWrap>
      <MonthHeader>
        {daysOfWeek.map((dayName, index) => (
          <MonthHeaderDay key={index}>
            {dayName}
          </MonthHeaderDay>
        ))}
      </MonthHeader>
      <Grid>
        {allDays.map((day, index) => (
          <DayContainer key={index + 7} $isCurrentMonth={day.isCurrentMonth}>
            <Day day={day} searchText={searchText || ''} />
          </DayContainer>
        ))}
      </Grid>
    </MonthWrap>
  );
};

export default Month;