import React from 'react';

export interface Task {
  id: string;
  name: string;
  date: Date;
  labels: string[];
}

interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (taskId: string, taskName: string, selectedLabels: string[]) => void;
  removeTask: (taskId: string) => void;
  setTasks: (labels: Task[]) => void;
}

const TasksContext = React.createContext<TasksContextProps>({
  tasks: [],
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
  setTasks: () => {},
});

export default TasksContext;