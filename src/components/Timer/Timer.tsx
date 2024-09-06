import React, { useEffect, useState, useRef } from 'react';
import styles from './Timer.module.css';

interface TimerProps {
  active: boolean;
}

const Timer: React.FC<TimerProps> = ({ active }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 5);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active]);

  useEffect(() => {
    if (!active) {
      setTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [active]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours > 0 ? `${hours}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return <div className={styles.timer}>{active ? formatTime(time) : ''}</div>;
};

export default Timer;
