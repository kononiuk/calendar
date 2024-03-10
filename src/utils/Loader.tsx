import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const StyledLoader = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid green;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const Loader: React.FC = () => {
  return <StyledLoader />;
};

export default Loader;