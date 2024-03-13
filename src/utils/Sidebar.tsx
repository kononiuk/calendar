import React from 'react';
import styled from 'styled-components';

/**
 * SidebarContainer is a styled-component div that styles the main container of the Sidebar.
 */
const SidebarContainer = styled.div`
  min-width: 300px;
  padding: 30px 16px 16px 16px;
  overflow-y: auto;
`;

/**
 * SidebarTitle is a styled-component h3 that styles the title of the Sidebar.
 */
const SidebarTitle = styled.h3`
  font-weight: 600;
`;

/**
 * Sidebar is a functional component that renders a sidebar with a title and children.
 * 
 * @param {Object} props - The properties that define the title and children of the sidebar.
 * @param {string} props.title - The title of the sidebar.
 * @param {React.ReactNode} props.children - The children of the sidebar.
 */
const Sidebar = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <SidebarContainer>
      <SidebarTitle>{title}</SidebarTitle>
      {children}
    </SidebarContainer>
  );
};

export default Sidebar;