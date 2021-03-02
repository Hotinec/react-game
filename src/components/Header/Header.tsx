/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import { get } from '../../sevices/storageService';
import DigitPanel from '../DigitPanel';
import StartButton from '../StartButton';

import './styles.scss';

const Header: React.FC<{setDataTime: Function}> = ({ setDataTime }) => {
  const mines = useTypedSelector((state) => state.view.mines);
  const status = useTypedSelector((state) => state.game.status);
  const [time, setTime] = useState(0);
  const [isMemory, setIsMemory] = useState(true);

  useEffect(() => {
    let timeInterval: number | undefined;

    if (status === 'playing') {
      const storedTime = get('time');
      if (isMemory && storedTime) {
        setTime(storedTime);
        setIsMemory(false);
      }

      timeInterval = window.setInterval(() => setTime((time) => {
        time++;
        setDataTime(time);
        return time;
      }), 1000);
    }

    if (status === 'lose' || status === 'win') {
      clearInterval(timeInterval);
    }

    if (status === 'start') {
      setTime(0);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [status]);

  return (
    <div className="header">
      <DigitPanel data={mines}/>
      <StartButton />
      <DigitPanel data={time}/>
    </div> 
  );
}

export default Header;