import React, { useState } from 'react';

interface TaskFormProps {
  onSave: (taskName: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task name"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;