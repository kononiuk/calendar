import React from 'react';

/**
 * Interface for Task
 * @interface
 * @property {string} id - The ID of the task
 * @property {string} name - The name of the task
 * @property {Date} date - The date of the task
 * @property {string[]} labels - The labels of the task
 */
export interface Task {
  id: string;
  name: string;
  date: Date;
  labels: string[];
}

/**
 * Interface for TasksContextProps
 * @interface
 * @property {Task[]} tasks - The tasks
 * @property {function} addTask - Function to add a task
 * @property {function} editTask - Function to edit a task
 * @property {function} removeTask - Function to remove a task
 * @property {function} setTasks - Function to set tasks
 */
interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (taskId: string, taskName: string, date: Date, selectedLabels: string[]) => void;
  removeTask: (taskId: string) => void;
  setTasks: (labels: Task[]) => void;
}

/**
 * TasksContext is a React context for the tasks data and functions.
 * It provides a way to pass the tasks data and functions through the component tree without having to pass props down manually at every level.
 */
const TasksContext = React.createContext<TasksContextProps>({
  tasks: [],
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
  setTasks: () => {},
});

export default TasksContext;