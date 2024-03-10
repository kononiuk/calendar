import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import LabelContext from '../contexts/LabelsContext';
import LabelEditor from './LabelEditor';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const LabelsList = styled.ul`
  list-style: none;
  margin-top: 0;
  padding: 0;
`;

const Label = styled.li`
  margin-top: 16px;
`;

const LabelForm = () => {
  const { labels, addLabel, editLabel, removeLabel } = useContext(LabelContext);
  const [labelName, setLabelName] = useState('');
  const [color, setColor] = useState('#008000');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addLabel({ id: '', name: labelName, color });
    setLabelName('');
    setColor('#008000');
  };

  return (
    <div>
      <LabelsList>
        {labels.map((label) => (
          <Label key={label.id}>
            <LabelEditor label={label} updateLabel={editLabel} removeLabel={removeLabel} />
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