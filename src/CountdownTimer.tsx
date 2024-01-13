import React, {useEffect, useState} from 'react';
import {CountdownTimerProps} from './types';

const CountdownTimer: React.FC<CountdownTimerProps> = ({ interval }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(interval / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining(prevSeconds => {
        const nextSeconds = prevSeconds - 1;

        if (nextSeconds <= 0) {
          return interval / 1000;
        }

        return nextSeconds;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div>
      Time until next fetch: {secondsRemaining} seconds
    </div>
  );
};

export default CountdownTimer;