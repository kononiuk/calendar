import React from 'react';

/**
 * Interface for Label
 * @interface
 * @property {string} id - The ID of the label
 * @property {string} name - The name of the label
 * @property {string} color - The color of the label
 * @property {boolean} isFiltered - Whether the label is filtered
 */
export interface Label {
  id: string;
  name: string;
  color: string;
  isFiltered: boolean;
}

/**
 * Interface for LabelsContextProps
 * @interface
 * @property {Label[]} labels - The labels
 * @property {function} addLabel - Function to add a label
 * @property {function} editLabel - Function to edit a label
 * @property {function} removeLabel - Function to remove a label
 * @property {function} setLabels - Function to set labels
 */
interface LabelsContextProps {
  labels: Label[];
  addLabel: (label: Label) => void;
  editLabel: (labelId: string, labelName: string, labelColor: string, isFiltered: boolean) => void;
  removeLabel: (labelId: string) => void;
  setLabels: (labels: Label[]) => void;
}

/**
 * LabelsContext is a React context for the labels data and functions.
 * It provides a way to pass the labels data and functions through the component tree without having to pass props down manually at every level.
 */
const LabelsContext = React.createContext<LabelsContextProps>({
  labels: [],
  addLabel: () => {},
  editLabel: () => {},
  removeLabel: () => {},
  setLabels: () => {},
});

export default LabelsContext;