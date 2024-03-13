import React, { useState, useContext, useEffect, useRef } from 'react';
import LabelContext from '../contexts/LabelsContext';
import styled from 'styled-components';

/**
 * @typedef {Object} TaskFormProps
 * @property {(taskName: string, taskLabels: string[], closePopup: () => void) => void} onSave - The function to save the task.
 * @property {() => void} [onDelete] - The function to delete the task.
 * @property {() => void} closePopup - The function to close the popup.
 * @property {string} [initialName] - The initial name of the task.
 * @property {string[]} [initialLabels] - The initial labels of the task.
 */

interface TaskFormProps {
  onSave: (taskName: string, taskLabels: string[], closePopup: () => void) => void;
  onDelete?: () => void;
  closePopup: () => void;
  initialName?: string;
  initialLabels?: string[];
}

/**
 * @typedef {Object} LabelButtonProps
 * @property {boolean} $selected - A flag indicating if the label is selected.
 * @property {string} $background - The background color of the label button.
 */

interface LabelButtonProps {
  $selected: boolean;
  $background: string;
}

/**
 * Form is a styled-component form that styles the main form of the TaskForm.
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
`;

/**
 * Input is a styled-component input that styles the input field of the TaskForm.
 */
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

/**
 * Actions is a styled-component div that styles the actions container of the TaskForm.
 */
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

/**
 * Button is a styled-component button that styles the main button of the TaskForm.
 */
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

/**
 * DeleteButton is a styled-component button that styles the delete button of the TaskForm.
 */
const DeleteButton = styled(Button)`
  background-color: #efefef;
`;

/**
 * LabelButton is a styled-component button that styles the label button of the TaskForm.
 * 
 * @typedef {Object} LabelButtonProps
 * @property {boolean} $selected - A flag indicating if the label is selected.
 * @property {string} $background - The background color of the label button.
 */
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

/**
 * TaskForm is a functional component that renders a form for creating or editing a task.
 * 
 * @param {TaskFormProps} props - The properties that define the behavior of the task form.
 */
const TaskForm: React.FC<TaskFormProps> = ({ onSave, onDelete, closePopup, initialName = '', initialLabels = [] }) => {
  const [taskName, setTaskName] = useState(initialName);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(initialLabels);
  const inputRef = useRef<HTMLInputElement>(null);

  const { labels } = useContext(LabelContext);

  /**
   * useEffect hook to focus on the input field when the component is mounted.
   */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * Toggles the selection of a label.
   * 
   * @param {string} labelId - The id of the label to toggle.
   * @param {React.FormEvent<HTMLButtonElement>} event - The event that triggered the toggle.
   */
  const toggleLabel = (labelId: string, event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedLabels((prevSelectedLabels: string[]) => 
      prevSelectedLabels.includes(labelId)
        ? prevSelectedLabels.filter((id) => id !== labelId)
        : [...prevSelectedLabels, labelId]
    );
  };

  /**
   * Handles the submission of the form.
   * 
   * @param {React.FormEvent} event - The event that triggered the submission.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(taskName, selectedLabels, closePopup);
    setTaskName('');
    setSelectedLabels([]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
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