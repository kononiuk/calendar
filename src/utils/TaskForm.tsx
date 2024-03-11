import React, { useState, useContext } from 'react';
import LabelContext from '../contexts/LabelsContext';
import styled from 'styled-components';

interface TaskFormProps {
  onSave: (taskName: string, selectedLabels: string[]) => void;
  onDelete?: () => void;
  initialName?: string;
  initialLabels?: string[];
}

interface LabelButtonProps {
  $selected: boolean;
  $background: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button`
  background-color: #e3e4e6;
  color: black;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26), 0 2px 10px 0 rgba(0,0,0,0.16);
  outline: none;
  flex-basis: 100%;
  &:hover {
    background-color: #d3d4d6;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #efefef;
`;

const LabelButton = styled.button<LabelButtonProps>`
  background-color: ${(props) => props.$background};
  border-style: none;
  border-radius: 10px;
  color: white;
  padding: 2px 10px;
  margin: 5px;
  cursor: pointer;
  opacity: ${(props) => (props.$selected ? '1' : '0.5')};
  &:hover {
    opacity: 0.8;
  }
`;

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onDelete, initialName = '', initialLabels = [] }) => {
  const [taskName, setTaskName] = useState(initialName);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(initialLabels);

  const { labels } = useContext(LabelContext);

  const toggleLabel = (labelId: string, event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedLabels((prevSelectedLabels: string[]) => 
      prevSelectedLabels.includes(labelId)
        ? prevSelectedLabels.filter((id) => id !== labelId)
        : [...prevSelectedLabels, labelId]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(taskName, selectedLabels);
    setTaskName('');
    setSelectedLabels([]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task name"
        required
      />
      <div>
        {labels.map((label) => (
          <LabelButton
            key={label.id}
            onClick={(event) => {
              event.stopPropagation();
              toggleLabel(label.id, event);
            }}
            $selected={selectedLabels.includes(label.id)}
            $background={label.color}
          >
            {label.name}
          </LabelButton>
        ))}
      </div>
      <Actions>
        <Button type="submit">Save</Button>
        {initialName && <DeleteButton type="button" onClick={onDelete}>Delete</DeleteButton>}
      </Actions>
    </Form>
  );
};

export default TaskForm;