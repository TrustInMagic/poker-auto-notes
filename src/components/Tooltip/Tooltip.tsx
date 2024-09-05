'use client';
import style from './Tooltip.module.css';

import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  return (
    <div
      className={style['tooltip-wrapper']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseLeave}
    >
      {children}
      {visible && <div className={style['tooltip']}>{text}</div>}
    </div>
  );
};

export default Tooltip;
