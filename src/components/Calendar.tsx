import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Month from './Month';
import Sidebar from '../utils/Sidebar';
import Labels from '../components/labels/Labels';
import IO from '../components/data-io/ExportImport';

const Main = styled.div`
  background-color: #eeeff1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 24px;
  background-color: #eeeff1;
`;

const HeaderTitle = styled.h1`
  display: inline-block;
  font-size: 24px;
  margin: 0 0 0 32px;
  color: black;
`;

const Button = styled.button`
  background-color: #e3e4e6;
  color: black;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26), 0 2px 10px 0 rgba(0,0,0,0.16);
  outline: none;
  &:hover {
    background-color: #d3d4d6;
  }
`;

const FuncButton = styled(Button)`
  margin-right: 16px;
`;

const SearchInput = styled.input`
  margin: 0 auto;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  width: 300px;
`;

const MonthsWrap = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const Calendar: React.FC = () => {
  const [prevMonth, setPrevMonth] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date[]>([]);
  const [nextMonth, setNextMonth] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchText, setSearchText] = useState('');

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

  const [activeSidebarComponent, setActiveSidebarComponent] = useState('');

  return (
    <Main>
      <Header>
      <FuncButton onClick={() => { setActiveSidebarComponent(activeSidebarComponent !== 'Labels' ? 'Labels' : ''); }}>Labels</FuncButton>
      <FuncButton onClick={() => { setActiveSidebarComponent(activeSidebarComponent !== 'IO' ? 'IO' : ''); }}>Export/Import</FuncButton>
        <SearchInput
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search tasks"
        />
        <Button onClick={handlePrevMonth}>&lt;</Button>
        <Button onClick={handleToday}>Today</Button>
        <Button onClick={handleNextMonth}>&gt;</Button>
        <HeaderTitle>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</HeaderTitle>
      </Header>
      <MonthsWrap>
        {activeSidebarComponent === 'Labels' && 
          <Sidebar title="Labels">
            <Labels />
          </Sidebar>
        }
        {activeSidebarComponent === 'IO' && 
          <Sidebar title="Export/Import">
            <IO />
          </Sidebar>
        }
        <Month days={currentMonth} prevMonthDays={prevMonth} nextMonthDays={nextMonth} searchText={searchText} />
      </MonthsWrap>
    </Main>
  );
};

export default Calendar;