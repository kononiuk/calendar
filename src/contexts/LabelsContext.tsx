import React from 'react';

export interface Label {
  id: string;
  name: string;
  color: string;
}

interface LabelsContextProps {
  labels: Label[];
  addLabel: (label: Label) => void;
  editLabel: (labelId: string, labelName: string, labelColor: string) => void;
  removeLabel: (labelId: string) => void;
}

const LabelsContext = React.createContext<LabelsContextProps>({
  labels: [],
  addLabel: () => {},
  editLabel: () => {},
  removeLabel: () => {},
});

export default LabelsContext;