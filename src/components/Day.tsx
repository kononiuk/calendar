import React, { useContext } from 'react';
import styled from 'styled-components';
import HolidayContext from '../contexts/HolidayContext';
import TasksContext from '../contexts/TasksContext';
import LabelsContext from '../contexts/LabelsContext';
import Popup from '../utils/Popup';
import Holidays from './Holidays';
import TaskForm from '../utils/TaskForm';

/**
 * Interface for DayProps
 * @interface
 * @property {Object} day - The day object
 * @property {Date} day.date - The date of the day
 * @property {boolean} day.isToday - Whether the day is today
 * @property {boolean} day.isCurrentMonth - Whether the day is in the current month
 * @property {boolean} day.isLast - Whether the day is the last day in its month
 * @property {boolean} day.isFirst - Whether the day is the first day in its month
 * @property {string} searchText - The text to search for
 */
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

/**
 * Interface for HolidaysTriggerTextProps
 * @interface
 * @property {boolean} $moreThanOne - Whether there is more than one holiday
 */
interface HolidaysTriggerTextProps {
  $moreThanOne: boolean;
}
interface HolidaysTriggerTextProps {
  $moreThanOne: boolean;
}

/**
 * Interface for TodayTextProps
 * @interface
 * @property {boolean} $isCurrentMonth - Whether the day is in the current month
 */
interface TodayTextProps {
  $isCurrentMonth: boolean;
}

/**
 * Interface for HolidaysBlockProps
 * @interface
 * @property {boolean} $hasHolidays - Whether there are holidays
 */
interface HolidaysBlockProps {
  $hasHolidays: boolean;
}

/**
 * Interface for DayLabelProps
 * @interface
 * @property {string} $labelColor - The color of the label
 */
interface DayLabelProps {
  $labelColor: string;
}

/**
 * DayCell is the main container for each day in the calendar
 */
const DayCell = styled.div`
  padding: 4px 8px;
  max-width: 100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

/**
 * TodayWrapper is a container for the current day indicator
 */
const TodayWrapper = styled.div`
  min-height: 18px;
`;

/**
 * Today is a styled component that represents the current day
 */
const Today = styled.span`
  background-color: green;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin-left: auto;
`;

/**
 * HolidaysTrigger is a styled component that triggers the display of holidays
 */
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

/**
 * HolidaysTriggerText is a styled component that displays the holiday text
 * @typedef {Object} HolidaysTriggerTextProps
 * @property {boolean} $moreThanOne - A flag indicating if there is more than one holiday
 */
const HolidaysTriggerText = styled.span<HolidaysTriggerTextProps>`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.$moreThanOne ? 'calc(100% - 20px)' : '100%'};
`;

/**
 * TaskCard is a styled component that represents a task card
 */
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

/**
 * TaskQuantity is a styled component that displays the number of tasks
 */
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

/**
 * TodayTrigger is a styled component that triggers the display of the current day
 */
const TodayTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/**
 * TodayText is a styled component that displays the current day text
 * @typedef {Object} TodayTextProps
 * @property {boolean} $isCurrentMonth - A flag indicating if the current day is in the current month
 */
const TodayText = styled.span<TodayTextProps>`
  font-size: 14px;
  font-weight: ${(props) => props.$isCurrentMonth ? '600' : '400'};
`;

/**
 * HolidaysBlock is a styled component that contains the holidays
 * @typedef {Object} HolidaysBlockProps
 * @property {boolean} $hasHolidays - A flag indicating if there are holidays
 */
const HolidaysBlock = styled.div<HolidaysBlockProps>`
  min-height: ${(props) => props.$hasHolidays ? '18px' : '0'};
  overflow: hidden;
`;

/**
 * AdditionalHolidaysCount is a styled component that displays the count of additional holidays
 */
const AdditionalHolidaysCount = styled.span`
  color: #e3e4e6;
  font-size: 10px;
`;

/**
 * FullHeightContainer is a styled component that takes up the full height of its parent
 */
const FullHeightContainer = styled.div`
  height: 100%;
`;

/**
 * DayLabelList is a styled component that contains the list of day labels
 */
const DayLabelList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

/**
 * DayLabel is a styled component that represents a day label
 * @typedef {Object} DayLabelProps
 * @property {string} $labelColor - The color of the label
 */
const DayLabel = styled.li<DayLabelProps>`
  background-color: ${(props) => props.$labelColor};
  border-radius: 5px;
  height: 10px;
  padding: 0;
  margin: 0;
  flex-basis: 30px;
`;

/**
 * Day component represents a single day in the calendar.
 * It includes tasks, holidays, and allows for task creation and editing.
 * 
 * @param {DayProps} props - The properties that define the day, including the date and search text.
 */
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

  /**
   * Handle drag start event by setting the task ID as the drag data
   * 
   * @param {React.DragEvent} event - The drag event
   * @param {string} taskId - The ID of the task being dragged
   */
  const handleDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
  };
  
  /**
   * Handle drag end event by clearing the drag data
   * 
   * @param {React.DragEvent} event - The drag event
   */
  const handleDragEnd = (event: React.DragEvent) => {
    event.dataTransfer.clearData();
  };
  
  /**
   * Handle drop event by moving the task to the target date
   * 
   * @param {React.DragEvent} event - The drop event
   * @param {Date} targetDate - The date where the task is dropped
   */
  const handleDrop = (event: React.DragEvent, targetDate: Date) => {
    const taskId = event.dataTransfer.getData('text/plain');
    const task = tasks.find((task) => task.id === taskId);
  
    if (task) {
      if (task.date.getTime() !== targetDate.getTime()) {
        editTask(taskId, task.name, targetDate, task.labels);
      }
    }
  };

  return (
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

      {dayTasks && dayTasks.length > 0 && dayTasks.slice(0, 2).map((task, index) => (
        <Popup
          key={index}
          trigger={
            <TaskCard 
              draggable
              onDragStart={(event) => handleDragStart(event, task.id)}
              onDragEnd={handleDragEnd}>
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
              {task.name}
            </TaskCard>
          }
          content={(closePopup) => (
            <TaskForm
              initialName={task.name}
              initialLabels={task.labels}
              onSave={(taskName: string, selectedLabels: string[]) => {
                editTask(task.id, taskName, task.date, selectedLabels);
                closePopup();
              }}
              closePopup={closePopup}
            />
          )}
        />
      ))}

      {dayTasks && dayTasks.length > 2 && (
        <Popup
          trigger={
            <TaskQuantity>+{dayTasks.length-2}</TaskQuantity>
          }
          content={
            <div>
              {dayTasks.map((task) => (
                <TaskCard key={task.id}>
                  <Popup
                    trigger={
                      <div key={task.id}>
                        {task.name}
                        <DayLabelList>
                          {task.labels.map((labelId) => {
                            const label = labels.find((label) => label.id === labelId);
                            return (
                              label && (
                                <DayLabel key={labelId} $labelColor={label.color}></DayLabel>
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