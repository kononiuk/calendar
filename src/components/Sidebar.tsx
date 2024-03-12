import React from 'react';
import Labels from './Labels';
import styled from 'styled-components';

const Sidebar = styled.div`
  min-width: 300px;
  padding: 30px 16px 16px 16px;
  overflow-y: auto;
`;

const SidebarTitle = styled.h3`
  font-weight: 600;
`;

const LabelsForm = () => {
  return (
    <Sidebar>
      <SidebarTitle>Labels</SidebarTitle>
      <Labels />
    </Sidebar>
  );
};

export default LabelsForm;