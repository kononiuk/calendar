import React, { useContext } from 'react';
import HolidayContext from '../contexts/HolidayContext';
import TasksContext from '../contexts/TasksContext';
import Popup from '../utils/Popup';
import Holidays from './Holidays';
import TaskForm from '../utils/TaskForm';

interface DayProps {
  day: {
    date: Date;
    isToday: boolean;
    isCurrentMonth: boolean;
    isLast: boolean;
    isFirst: boolean;
  };
  searchText: string;
}

const Day: React.FC<DayProps> = ({ day, searchText }) => {
  const holidays = useContext(HolidayContext);
  const { tasks, addTask, editTask, removeTask } = useContext(TasksContext);

  const dayTasks = tasks
    .filter(task => task.date.getTime() === day.date.getTime())
    .filter(task => task.name.toLowerCase().includes(searchText.toLowerCase()));

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

  const taskCardStyle: React.CSSProperties = {
    backgroundColor: '#d3d3d3',
    cursor: 'pointer',
    padding: '2px 4px',
    margin: '4px 0 0 0',
    borderRadius: '4px',
    boxShadow: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    minHeight: '18px',
    boxSizing: 'border-box',
  };

  const tasksQuantityCard: React.CSSProperties = {
    backgroundColor: '#ebe9e9',
    cursor: 'pointer',
    padding: '2px 4px',
    margin: '4px 0 0 0',
    borderRadius: '4px',
    fontSize: '12px',
    minHeight: '18px',
    boxSizing: 'border-box',
  }

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

      {dayTasks && dayTasks.length > 0 && (
        <Popup
          trigger={
            <div key={dayTasks[0].id} style={taskCardStyle}>
              {dayTasks[0].name}
            </div>
          }
          content={
            <TaskForm
              initialName={dayTasks[0].name}
              onSave={(taskName: string) => {
                editTask(dayTasks[0].id, taskName);
              }}
              onDelete={() => {
                removeTask(dayTasks[0].id);
              }}
            />
          }
        />
      )}

      {dayTasks && dayTasks.length > 1 && (
        <Popup
          trigger={
            <div style={tasksQuantityCard}>+{dayTasks.length-1}</div>
          }
          content={
            <div>
              {dayTasks.map(task => (
                <div key={task.id} style={taskCardStyle}>
                  <Popup
                    trigger={
                      <div key={task.id}>
                        {task.name}
                      </div>
                    }
                    content={
                      <TaskForm
                        initialName={task.name}
                        onSave={(taskName: string) => {
                          editTask(task.id, taskName);
                        }}
                        onDelete={() => {
                          removeTask(task.id);
                        }}
                      />
                    }
                  />
                </div>
              ))}
            </div>
          }
        />
      )}

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