import React, { useState, ReactNode } from 'react';
import LabelsContext, { Label } from './LabelsContext';

interface LabelsProviderProps {
  children: ReactNode;
}

const LabelsProvider: React.FC<LabelsProviderProps> = ({ children }) => {
  const [labels, setLabels] = useState<Label[]>([]);

  const addLabel = (label: Label) => {
    setLabels((prevLabels) => [...prevLabels, label]);
  };

  const editLabel = (labelId: string, labelName: string, labelColor: string, isFiltered: boolean) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === labelId ? { ...label, name: labelName, color: labelColor, isFiltered: isFiltered } : label
      )
    );
  };

  const removeLabel = (labelId: string) => {
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelId));
  };

  return (
    <LabelsContext.Provider value={{ labels, addLabel, editLabel, removeLabel }}>
      {children}
    </LabelsContext.Provider>
  );
};

export default LabelsProvider;