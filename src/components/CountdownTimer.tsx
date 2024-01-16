import React, { useEffect, useState } from 'react';
import { CountdownTimerProps } from '../types';

const CountdownTimer: React.FC<CountdownTimerProps> = ({ interval }) => {

  // State to store the remaining seconds until the next fetch
  const [secondsRemaining, setSecondsRemaining] = useState(interval / 1000);

  useEffect(() => {

    // Set up an interval to update the countdown every second
    const intervalId = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {

        // Calculate the next remaining seconds
        const nextSeconds = prevSeconds - 1;

        // Reset the countdown to the initial interval if it reaches zero
        if (nextSeconds <= 0) {
          return interval / 1000;
        }

        // Continue the countdown
        return nextSeconds;
      });
    }, 1000);

    // Clean up the interval when the component is unmounted or when the
    // interval prop changes
    return () => clearInterval(intervalId);
  }, [interval]);

  // Component rendering
  return (
    <div>
      Time until next fetch: {secondsRemaining} seconds
    </div>
  );
};

export default CountdownTimer;
