import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styled from 'styled-components';

interface PopupProps {
  trigger: JSX.Element;
  content: JSX.Element | ((closePopup: () => void) => ReactNode);
  style?: React.CSSProperties;
}

interface Position {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

interface PopupStyleProps {
  $position: Position;
}

const FullHeightContainer = styled.div`
  height: 100%;
`;

const PopupStyle = styled.div<PopupStyleProps>`
  position: fixed;
  top: ${(props) => props.$position.top};
  right: ${(props) => props.$position.right};
  bottom: ${(props) => props.$position.bottom};
  left: ${(props) => props.$position.left};
  background-color: #fff;
  padding: 16px 36px 16px 16px;
  border-radius: 4px;
  max-width: 450px;
  min-width: 300px;
  z-index: 1000;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const CloseButtonStyle = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  color: black;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition-duration: 0.4s;
  outline: none;
`;

const Popup: React.FC<PopupProps> = ({ trigger, content, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleClickTrigger = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
  
    const clickPosition = { top: event.clientY, left: event.clientX };
    const distanceToEdges = {
      top: clickPosition.top,
      right: window.innerWidth - clickPosition.left,
      bottom: window.innerHeight - clickPosition.top,
      left: clickPosition.left,
    };
  
    const popupPosition = {
      top: distanceToEdges.bottom > distanceToEdges.top ? `${distanceToEdges.top}px` : 'auto',
      right: distanceToEdges.right > distanceToEdges.left ? 'auto' : `${distanceToEdges.right}px`,
      bottom: distanceToEdges.bottom > distanceToEdges.top ? 'auto' : `${distanceToEdges.bottom}px`,
      left: distanceToEdges.right > distanceToEdges.left ? `${distanceToEdges.left}px` : 'auto',
    };
  
    setPosition(popupPosition);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={style} ref={ref}>
      <FullHeightContainer onClick={handleClickTrigger} >
        {trigger}
      </FullHeightContainer>
      {isOpen && (
        <PopupStyle $position={position}>
          {typeof content === 'function' ? content(closePopup) : content}
          <CloseButtonStyle onClick={() => setIsOpen(false)}>X</CloseButtonStyle>
        </PopupStyle>
      )}
    </div>
  );
};

export default Popup;