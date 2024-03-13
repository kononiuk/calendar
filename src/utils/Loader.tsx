import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * spin is a keyframes function that defines a spinning animation.
 */
const spin = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

/**
 * StyledLoader is a styled-component div that is styled to look like a loader.
 * It uses the spin animation.
 */
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

/**
 * Loader is a functional component that renders the StyledLoader.
 */
const Loader: React.FC = () => {
  return <StyledLoader />;
};

export default Loader;