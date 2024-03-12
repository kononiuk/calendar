import React from 'react';

export interface Label {
  id: string;
  name: string;
  color: string;
  isFiltered: boolean;
}

interface LabelsContextProps {
  labels: Label[];
  addLabel: (label: Label) => void;
  editLabel: (labelId: string, labelName: string, labelColor: string, isFiltered: boolean) => void;
  removeLabel: (labelId: string) => void;
  setLabels: (labels: Label[]) => void;
}

const LabelsContext = React.createContext<LabelsContextProps>({
  labels: [],
  addLabel: () => {},
  editLabel: () => {},
  removeLabel: () => {},
  setLabels: () => {},
});

export default LabelsContext;