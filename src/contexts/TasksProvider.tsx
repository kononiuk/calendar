import React, { useState, ReactNode } from 'react';
import TasksContext, { Task } from './TasksContext';

interface TasksProviderProps {
  children: ReactNode;
}

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (taskId: string, taskName: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? { ...task, name: taskName } : task));
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;