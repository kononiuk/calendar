import React, { useState, ReactNode } from 'react';
import TasksContext, { Task } from './TasksContext';

/**
 * Interface for TasksProviderProps
 * @interface
 * @property {ReactNode} children - The children nodes
 */
interface TasksProviderProps {
  children: ReactNode;
}

/**
 * TasksProvider component provides the TasksContext to its children.
 * 
 * @param {TasksProviderProps} props - The properties that define the children nodes.
 */
const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Add a task to the tasks state.
   * 
   * @param {Task} task - The task to add
   */
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  /**
   * Edit a task in the tasks state.
   * 
   * @param {string} taskId - The ID of the task to edit
   * @param {string} taskName - The new name of the task
   * @param {Date} date - The new date of the task
   * @param {string[]} selectedLabels - The new labels of the task
   */
  const editTask = (taskId: string, taskName: string, date: Date, selectedLabels: string[]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, name: taskName, date: date, labels: selectedLabels } : task
      )
    );
  };

  /**
   * Remove a task from the tasks state.
   * 
   * @param {string} taskId - The ID of the task to remove
   */
  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, removeTask, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;