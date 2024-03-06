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
  editTask: (taskId: string, updatedTask: Task) => void;
  removeTask: (taskId: string) => void;
}

const TasksContext = React.createContext<TasksContextProps>({
  tasks: [],
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
});

export default TasksContext;