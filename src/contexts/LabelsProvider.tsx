import React, { useState, ReactNode } from 'react';
import LabelsContext, { Label } from './LabelsContext';

/**
 * Interface for LabelsProviderProps
 * @interface
 * @property {ReactNode} children - The children nodes
 */
interface LabelsProviderProps {
  children: ReactNode;
}

/**
 * LabelsProvider component provides the LabelsContext to its children.
 * 
 * @param {LabelsProviderProps} props - The properties that define the children nodes.
 */
const LabelsProvider: React.FC<LabelsProviderProps> = ({ children }) => {
  const [labels, setLabels] = useState<Label[]>([]);

  /**
   * Add a label to the labels state.
   * 
   * @param {Label} label - The label to add
   */
  const addLabel = (label: Label) => {
    setLabels((prevLabels) => [...prevLabels, label]);
  };

  /**
   * Edit a label in the labels state.
   * 
   * @param {string} labelId - The ID of the label to edit
   * @param {string} labelName - The new name of the label
   * @param {string} labelColor - The new color of the label
   * @param {boolean} isFiltered - The new filtered status of the label
   */
  const editLabel = (labelId: string, labelName: string, labelColor: string, isFiltered: boolean) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === labelId ? { ...label, name: labelName, color: labelColor, isFiltered: isFiltered } : label
      )
    );
  };

  /**
   * Remove a label from the labels state.
   * 
   * @param {string} labelId - The ID of the label to remove
   */
  const removeLabel = (labelId: string) => {
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelId));
  };

  return (
    <LabelsContext.Provider value={{ labels, addLabel, editLabel, removeLabel, setLabels }}>
      {children}
    </LabelsContext.Provider>
  );
};

export default LabelsProvider;