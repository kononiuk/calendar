import React, { useState, useRef, useEffect } from 'react';

interface PopupProps {
  trigger: JSX.Element;
  content: JSX.Element;
}

const Popup: React.FC<PopupProps> = ({ trigger, content }) => {
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const popupStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '4px',
    maxWidth: '450px',
    minWidth: '300px',
    zIndex: 1000,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  };

  const closeButtonStyle: React.CSSProperties = {
    backgroundColor: '#e3e4e6',
    color: 'black',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginTop: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
    transitionDuration: '0.4s',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26), 0 2px 10px 0 rgba(0,0,0,0.16)',
    outline: 'none'
  };

  return (
    <div ref={ref} style={{ height: '100%' }} >
      <div onClick={handleClickTrigger} style={{ height: '100%' }} >
        {trigger}
      </div>
      {isOpen && (
        <div style={popupStyle}>
          {content}
          <button style={closeButtonStyle} onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Popup;