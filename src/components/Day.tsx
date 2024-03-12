import React, { useContext } from 'react';
import styled from 'styled-components';
import HolidayContext from '../contexts/HolidayContext';
import TasksContext from '../contexts/TasksContext';
import LabelsContext from '../contexts/LabelsContext';
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

interface HolidaysTriggerTextProps {
  $moreThanOne: boolean;
}

interface TodayTextProps {
  $isCurrentMonth: boolean;
}

interface HolidaysBlockProps {
  $hasHolidays: boolean;
}

interface DayLabelProps {
  $labelColor: string;
}

const DayCell = styled.div`
  padding: 4px 8px;
  max-width: 100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const TodayWrapper = styled.div`
  min-height: 18px;
`;

const Today = styled.span`
  background-color: green;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin-left: auto;
`;

const HolidaysTrigger = styled.span`
  align-items: center;
  background-color: green;
  border-radius: 4px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  max-width: 100%;
  padding: 2px 4px;
  min-height: 12px;
`;

const HolidaysTriggerText = styled.span<HolidaysTriggerTextProps>`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.$moreThanOne ? 'calc(100% - 20px)' : '100%'};
`;

const TaskCard = styled.div`
  background-color: #ffffff;
  cursor: pointer;
  padding: 2px 4px;
  margin: 4px 0 0 0;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  min-height: 18px;
  box-sizing: border-box;
`;

const TaskQuantity = styled.div`
  background-color: #ebe9e9;
  cursor: pointer;
  padding: 2px 4px;
  margin: 4px 0 0 0;
  border-radius: 4px;
  font-size: 12px;
  min-height: 18px;
  box-sizing: border-box;
`;

const TodayTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodayText = styled.span<TodayTextProps>`
  font-size: 14px;
  font-weight: ${(props) => props.$isCurrentMonth ? '600' : '400'};
`;

const HolidaysBlock = styled.div<HolidaysBlockProps>`
  min-height: ${(props) => props.$hasHolidays ? '18px' : '0'};
  overflow: hidden;
`;

const AdditionalHolidaysCount = styled.span`
  color: #e3e4e6;
  font-size: 10px;
`;

const FullHeightContainer = styled.div`
  height: 100%;
`;

const DayLabelList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DayLabel = styled.li<DayLabelProps>`
  background-color: ${(props) => props.$labelColor};
  border-radius: 5px;
  height: 10px;
  padding: 0;
  margin: 0;
  flex-basis: 30px;
`;

const Day: React.FC<DayProps> = ({ day, searchText }) => {
  const holidays = useContext(HolidayContext);
  const { tasks, addTask, editTask, removeTask } = useContext(TasksContext);
  const { labels } = useContext(LabelsContext);
  const filteredLabels = labels.filter(label => label.isFiltered);

  let dayTasks = tasks
  .filter(task => task.date.getTime() === day.date.getTime())
  .filter(task => task.name.toLowerCase().includes(searchText.toLowerCase()));

  if (filteredLabels.length > 0) {
    dayTasks = dayTasks.filter(task => 
      task.labels.some(labelId => 
        filteredLabels.some(filteredLabel => filteredLabel.id === labelId)
      )
    );
  }

  const dateOptions: Intl.DateTimeFormatOptions = (day.isCurrentMonth && (day.isLast || day.isFirst)) || (!day.isCurrentMonth && (day.isFirst || day.isLast))
  ? { month: 'short', day: 'numeric' }
  : { month: undefined, day: 'numeric' };

  const matchingHolidays = holidays.filter(holiday => holiday.date === day.date.toISOString().split('T')[0]);

  const handleDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
  };
  
  const handleDragEnd = (event: React.DragEvent) => {
    event.dataTransfer.clearData();
  };
  
  const handleDrop = (event: React.DragEvent, targetDate: Date) => {
    const taskId = event.dataTransfer.getData('text/plain');
    const task = tasks.find((task) => task.id === taskId);
  
    if (task) {
      editTask(taskId, task.name, targetDate, task.labels);
    }
  };

  return (
    <DayCell
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, day.date)}
    >
    <DayCell
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, day.date)}
    >
      <TodayWrapper>
        <Popup 
          trigger={
            <TodayTrigger>
              <TodayText $isCurrentMonth={day.isCurrentMonth} >
                {day.date.toLocaleDateString(undefined, dateOptions)}
              </TodayText>
              {day.isToday && <Today/>}
            </TodayTrigger>
          }
          content={(closePopup) => (
            <TaskForm
              onSave={(taskName: string, taskLabels: string[]) => {
                const lastTaskId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
                const newTaskId = lastTaskId + 1;
                addTask({ id: newTaskId.toString(), name: taskName, date: day.date, labels: taskLabels || [] });
                closePopup();
              }}
              closePopup={closePopup}
            />
          )}
        />
      </TodayWrapper>

      <HolidaysBlock $hasHolidays={matchingHolidays.length > 0}>
        {matchingHolidays.length > 0 && 
          <Popup 
            trigger={
              <HolidaysTrigger>
                <HolidaysTriggerText $moreThanOne={matchingHolidays.length > 1}>
                  {matchingHolidays[0].name}
                </HolidaysTriggerText>
                {matchingHolidays.length > 1 && <AdditionalHolidaysCount>+{matchingHolidays.length - 1}</AdditionalHolidaysCount>}
              </HolidaysTrigger>
            }
            content={<Holidays matchingHolidays={matchingHolidays} />}
          />
        }
      </HolidaysBlock>

      {dayTasks && dayTasks.length > 0 && (
        <Popup
          trigger={
            <TaskCard 
              key={dayTasks[0].id}
              draggable
              onDragStart={(event) => handleDragStart(event, dayTasks[0].id)}
              onDragEnd={handleDragEnd}>
              <DayLabelList>
                {dayTasks[0].labels.map((labelId: string, index: number) => {
                  const label = labels.find((label) => label.id === labelId);
                  return (
                    label && (
                      <DayLabel key={index} $labelColor={label.color}></DayLabel>
                    )
                  );
                })}
              </DayLabelList>
              {dayTasks[0].name}
            </TaskCard>
          }
          content={(closePopup) => (
            <TaskForm
              initialName={dayTasks[0].name}
              initialLabels={dayTasks[0].labels}
              onSave={(taskName: string, selectedLabels: string[]) => {
                editTask(dayTasks[0].id, taskName, dayTasks[0].date, selectedLabels);
                closePopup();
              }}
              onDelete={() => {
                removeTask(dayTasks[0].id);
                closePopup();
              }}
              closePopup={closePopup}
            />
          )}
        />
      )}

      {dayTasks && dayTasks.length > 1 && (
        <Popup
          trigger={
            <TaskQuantity>+{dayTasks.length-1}</TaskQuantity>
          }
          content={
            <div>
              {dayTasks.map(task => (
                <TaskCard key={task.id}>
                  <Popup
                    trigger={
                      <div key={task.id}>
                        {task.name}
                        <DayLabelList>
                          {task.labels.map((labelId: string, index: number) => {
                            const label = labels.find((label) => label.id === labelId);
                            return (
                              label && (
                                <DayLabel key={index} $labelColor={label.color}></DayLabel>
                              )
                            );
                          })}
                        </DayLabelList>
                      </div>
                    }
                    content={(closePopup) => (
                      <TaskForm
                        initialName={task.name}
                        initialLabels={task.labels}
                        initialLabels={task.labels}
                        onSave={(taskName: string, selectedLabels: string[]) => {
                          editTask(task.id, taskName, task.date, selectedLabels);
                          closePopup();
                        }}
                        onDelete={() => {
                          removeTask(task.id);
                          closePopup();
                        }}
                        closePopup={closePopup}
                      />
                    )}
                  />
                </TaskCard>
              ))}
            </div>
          }
        />
      )}

      <FullHeightContainer>
        <Popup 
          trigger={
            <FullHeightContainer/>
          }
          content={(closePopup) => (
            <TaskForm 
              onSave={(taskName: string, taskLabels: string[]) => {
                const lastTaskId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
                const newTaskId = lastTaskId + 1;
                addTask({ id: newTaskId.toString(), name: taskName, date: day.date, labels: taskLabels || [] });
                closePopup();
              }}
              closePopup={closePopup} 
            />
          )}
          style={{height: '100%'}}
        />
      </FullHeightContainer>
    </DayCell>
  );
};

export default Day;