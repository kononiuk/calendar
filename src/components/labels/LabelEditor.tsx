import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * Props for the LabelEditor component.
 */
interface LabelEditorProps {
  label: { id: string; name: string; color: string };
  updateLabel: (id: string, name: string, color: string) => void;
  removeLabel: (id: string) => void;
}

/**
 * Styled component for the form.
 */
const Form = styled.form`
  flex-grow: 1;
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
 * Styled component for the actions wrapper.
 */
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
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
 * Styled component for the delete button.
 */
const DeleteButton = styled(Button)`
  background-color: #efefef;
`;

/**
 * A component for editing a label.
 *
 * @param {LabelEditorProps} props - The props for the component.
 */
const LabelEditor: React.FC<LabelEditorProps> = ({ label, updateLabel, removeLabel }) => {
  const [name, setName] = useState(label.name);
  const [color, setColor] = useState(label.color);

  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent} event - The form event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateLabel(label.id, name, color);
  };

  /**
   * Handles the removal of a label.
   */
  const handleRemove = () => {
    removeLabel(label.id);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputsWrapper>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ColorInput
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </InputsWrapper>
      <Actions>
        <Button type="submit">Update</Button>
        <DeleteButton type="button" onClick={handleRemove}>Remove</DeleteButton>
      </Actions>
    </Form>
  );
};

export default LabelEditor;