import React, { useState } from 'react';

interface TaskFormProps {
  onSave: (taskName: string) => void;
  onDelete?: () => void;
  initialName?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onDelete, initialName = '' }) => {
  const [taskName, setTaskName] = useState(initialName);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(taskName);
    setTaskName('');
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '300px',
    margin: 'auto'
  };

  const inputStyle: React.CSSProperties = {
    border: 'none',
    borderBottom: '1px solid #000',
    padding: '10px',
    fontSize: '16px',
    outline: 'none'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#e3e4e6',
    color: 'black',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '0 4px',
    cursor: 'pointer',
    borderRadius: '4px',
    transitionDuration: '0.4s',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26), 0 2px 10px 0 rgba(0,0,0,0.16)',
    outline: 'none'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task name"
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Save</button>
      <button type="button" onClick={onDelete} style={buttonStyle}>Delete</button>
    </form>
  );
};

export default TaskForm;