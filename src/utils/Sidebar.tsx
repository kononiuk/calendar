import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  min-width: 300px;
  padding: 30px 16px 16px 16px;
  overflow-y: auto;
`;

const SidebarTitle = styled.h3`
  font-weight: 600;
`;

const Sidebar = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <SidebarContainer>
      <SidebarTitle>{title}</SidebarTitle>
      {children}
    </SidebarContainer>
  );
};

export default Sidebar;