import React, { useState } from 'react';
import styled from 'styled-components';

interface LabelEditorProps {
  label: { id: string; name: string; color: string };
  updateLabel: (id: string, name: string, color: string) => void;
  removeLabel: (id: string) => void;
}

const Form = styled.form`
  flex-grow: 1;
`;

const InputsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  height: 36px;
  flex-grow: 1;
  padding: 10px;
`;

const ColorInput = styled(Input)`
  padding: 2px 4px;
  flex-grow: 0;
  min-width: 50px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
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

const LabelEditor: React.FC<LabelEditorProps> = ({ label, updateLabel, removeLabel }) => {
  const [name, setName] = useState(label.name);
  const [color, setColor] = useState(label.color);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateLabel(label.id, name, color);
  };

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