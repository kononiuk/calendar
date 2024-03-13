import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import LabelContext from '../../contexts/LabelsContext';
import LabelEditor from './LabelEditor';

/**
 * Styled component for the form.
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/**
 * Styled component for the inputs wrapper.
 */
const InputsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

/**
 * Styled component for the input.
 */
const Input = styled.input`
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  height: 36px;
  flex-grow: 1;
  padding: 10px;
`;

/**
 * Styled component for the color input, which is a special type of input.
 */
const ColorInput = styled(Input)`
  padding: 2px 4px;
  flex-grow: 0;
  min-width: 50px;
`;

/**
 * Styled component for the button.
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
 * Styled component for the labels list.
 */
const LabelsList = styled.ul`
  list-style: none;
  margin-top: 0;
  padding: 0;
`;

/**
 * Styled component for the label.
 */
const Label = styled.li`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

/**
 * Styled component for the checkbox.
 */
const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #000000;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  outline: none;

  &:checked {
    background-color: #000000;
  }

  &:checked::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    top: 0;
    left: 4px;
    transform: rotate(45deg);
  }
`;

/**
 * A form for creating and managing labels.
 */
const LabelForm = () => {
  const { labels, addLabel, editLabel, removeLabel } = useContext(LabelContext);
  const [labelName, setLabelName] = useState('');
  const [color, setColor] = useState('#008000');

  /**
   * Generates a unique ID for a new label.
   */
  const generateId = () => {
    return Date.now().toString();
  };

  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent} event - The form event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addLabel({ id: generateId(), name: labelName, color, isFiltered: false });
    setLabelName('');
    setColor('#008000');
  };

  /**
   * Toggles the filter status of a label.
   *
   * @param {string} labelId - The ID of the label.
   */
  const toggleFilterLabel = (labelId: string) => {
    const label = labels.find((label) => label.id === labelId);
    if (label) {
      editLabel(label.id, label.name, label.color, !label.isFiltered);
    }
  };

  return (
    <div>
      <LabelsList>
        {labels.map((label) => (
          <Label key={label.id}>
            <StyledCheckbox
              checked={label.isFiltered}
              onChange={() => toggleFilterLabel(label.id)}
            />
            <LabelEditor
              label={label}
              updateLabel={(name: string, color: string) => editLabel(label.id, name, color, label.isFiltered)}
              removeLabel={removeLabel}
            />
          </Label>
        ))}
      </LabelsList>
      <Form onSubmit={handleSubmit}>
        <InputsWrapper>
          <Input
            type="text"
            placeholder="Label name"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            required
          />
          <ColorInput
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </InputsWrapper>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
};

export default LabelForm;