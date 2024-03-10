import React from 'react';
import styled from 'styled-components';
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

interface DayContainerProps {
  $isCurrentMonth: boolean;
}

const MonthWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
`;

const MonthHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  justify-content: space-around;
`;

const MonthHeaderDay = styled.div`
  background-color: #eeeff1;
  padding: 4px;
`;

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

const DayContainer = styled.div<DayContainerProps>`
  background-color: ${(props) => (props.$isCurrentMonth ? '#e3e4e6' : '#ebebeb')};
  min-width: 0;
  overflow-y: auto;
`;

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