import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styled from 'styled-components';

/**
 * Interface for PopupProps
 * @interface
 * @property {JSX.Element} trigger - The JSX element that triggers the popup
 * @property {JSX.Element | ((closePopup: () => void) => ReactNode)} content - The content of the popup
 * @property {React.CSSProperties} style - The CSS properties for the popup
 */
interface PopupProps {
  trigger: JSX.Element;
  content: JSX.Element | ((closePopup: () => void) => ReactNode);
  style?: React.CSSProperties;
}

/**
 * Interface for Position
 * @interface
 * @property {string} top - The top position
 * @property {string} right - The right position
 * @property {string} bottom - The bottom position
 * @property {string} left - The left position
 */
interface Position {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

/**
 * Interface for PopupStyleProps
 * @interface
 * @property {Position} $position - The position of the popup
 */
interface PopupStyleProps {
  $position: Position;
}

/**
 * FullHeightContainer is a styled-component div with height set to 100%.
 */
const FullHeightContainer = styled.div`
  height: 100%;
`;

/**
 * PopupStyle is a styled-component div that is styled to look like a popup.
 * It uses the position properties from the PopupStyleProps interface.
 * 
 * @typedef {Object} PopupStyleProps
 * @property {Position} $position - The position of the popup
 */
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

/**
 * CloseButtonStyle is a styled-component button that is styled to look like a close button.
 */
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

/**
 * Popup is a functional component that renders a popup.
 * 
 * @param {PopupProps} props - The properties that define the trigger, content, and style of the popup.
 */
const Popup: React.FC<PopupProps> = ({ trigger, content, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' });
  const ref = useRef<HTMLDivElement | null>(null);

  /**
   * handleClickOutside is a function that handles the click event outside the popup.
   * It closes the popup if the click is outside the popup.
   * 
   * @param {MouseEvent} event - The mouse event
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  /**
   * handleClickTrigger is a function that handles the click event on the trigger.
   * It toggles the popup and sets the position of the popup based on the click position.
   * 
   * @param {React.MouseEvent} event - The mouse event
   */
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

  /**
   * closePopup is a function that closes the popup.
   */
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