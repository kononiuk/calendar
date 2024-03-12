import React, { useContext } from 'react';
import styled from 'styled-components';
import LabelsContext from '../../contexts/LabelsContext';
import TasksContext, { Task } from '../../contexts/TasksContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  margin: 0 4px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26), 0 2px 10px 0 rgba(0,0,0,0.16);
  outline: none;
  &:hover {
    background-color: #d3d4d6;
  }
`;

const Import = styled.input`
  display: none;
`;

const ImportButton = styled(Button)`
  margin-top: 10px;
`;

const ExportToJson = () => {
  const { labels, setLabels } = useContext(LabelsContext);
  const { tasks, setTasks } = useContext(TasksContext);

  const handleExport = () => {
    const data = {
      labels,
      tasks
    };
  
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const data = JSON.parse(event.target.result as string);
          data.tasks = data.tasks.map((task: Task) => ({
            ...task,
            date: new Date(task.date)
          }));
          setLabels(data.labels);
          setTasks(data.tasks);
        }
      };
  
      reader.readAsText(file);
    }
  };

  return (
    <Wrapper>
      <Button onClick={handleExport}>Export to JSON</Button>
      <ImportButton as="label" htmlFor="file-upload">Import from JSON</ImportButton>
      <Import id="file-upload" type="file" accept=".json" onChange={handleFileUpload} />
    </Wrapper>
  );
};

export default ExportToJson;