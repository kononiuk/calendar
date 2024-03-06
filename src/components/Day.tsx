import React, { useContext } from 'react';
import HolidayContext from '../contexts/HolidayContext';
import TasksContext from '../contexts/TasksContext';
import Popup from './Popup';
import Holidays from './Holidays';
import TaskForm from './TaskForm';

interface DayProps {
  day: {
    date: Date;
    isToday: boolean;
    isCurrentMonth: boolean;
    isLast: boolean;
    isFirst: boolean;
  };
}

const Day: React.FC<DayProps> = ({ day }) => {
  const holidays = useContext(HolidayContext);
  const { tasks, addTask } = useContext(TasksContext);

  const dayTasks = tasks.filter(task => task.date.getTime() === day.date.getTime());

  console.log(tasks);

  const dateOptions: Intl.DateTimeFormatOptions = (day.isCurrentMonth && (day.isLast || day.isFirst)) || (!day.isCurrentMonth && (day.isFirst || day.isLast))
  ? { month: 'short', day: 'numeric' }
  : { month: undefined, day: 'numeric' };

  const matchingHolidays = holidays.filter(holiday => holiday.date === day.date.toISOString().split('T')[0]);

  const dayStyles: React.CSSProperties = {
    padding: '4px 8px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  };

  const todayStyles: React.CSSProperties = {
    backgroundColor: 'green',
    borderRadius: '50%',
    height: '10px',
    width: '10px',
    marginLeft: 'auto',
  };

  const holidaysStyle: React.CSSProperties = {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: '4px',
    boxSizing: 'border-box',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    maxWidth: '100%',
    padding: '2px 4px',
    minHeight: '12px',
  };

  const holidaysTextStyle: React.CSSProperties = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  };

  return (
    <div style={dayStyles}>
      <div style={{ minHeight: '18px' }}>
        <Popup 
          trigger={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{ fontSize: '14px' ,fontWeight: day.isCurrentMonth ? 600 : 400  }}>
                {day.date.toLocaleDateString(undefined, dateOptions)}
              </div>
              <span style={{ ...todayStyles, display: day.isToday ? 'inline-block' : 'none' }}></span>
            </div>
          }
          content={<TaskForm onSave={(taskName: string) => {
            const lastTaskId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
            const newTaskId = lastTaskId + 1;
            addTask({ id: newTaskId.toString(), name: taskName, date: day.date, labels: [] });
          }} />}
        />
      </div>

      <div style={{ overflow: 'hidden', minHeight: matchingHolidays.length > 0 ? '18px' : 0 }}>
        {matchingHolidays.length > 0 && 
          <Popup 
            trigger={
              <span style={holidaysStyle}>
                <span style={{ ...holidaysTextStyle, maxWidth: matchingHolidays.length > 1 ? 'calc(100% - 26px)' : '100%'  }}>{matchingHolidays[0].name}</span>
                {matchingHolidays.length > 1 && <span style={{ color: '#e3e4e6', fontSize: '10px' }}>+{matchingHolidays.length - 1}</span>}
              </span>
            }
            content={<Holidays matchingHolidays={matchingHolidays} />}
          />
        }
      </div>

      {dayTasks.map(task => (
        <div key={task.id} style={{ backgroundColor: '#e3e4e6', padding: '4px', margin: '4px 0', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {task.name}
        </div>
      ))}

      <div style={{ height: '100%' }}>
        <Popup 
          trigger={
            <div style={{ height: '100%' }}></div>
          }
          content={<TaskForm onSave={(taskName: string) => {
            const lastTaskId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
            const newTaskId = lastTaskId + 1;
            addTask({ id: newTaskId.toString(), name: taskName, date: day.date, labels: [] });
            
          }} />}
        />
      </div>
    </div>
  );
};

export default Day;