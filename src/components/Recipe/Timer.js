import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Timer = (props) => {

  const updateIntervalInSeconds = 5
  const endTime = new Date(props.recipe.timeFinished).getTime();

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const currentTime = new Date().getTime();
    const endTime = new Date(props.recipe.timeFinished).getTime();
    return Math.max(0, endTime - currentTime);
  }

useEffect(() => {
    const timerInterval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (endTime < new Date()) {
        clearInterval(timerInterval);
        props.finishCrafting(props.recipe);
      }
    }, updateIntervalInSeconds * 1000);

    return () => clearInterval(timerInterval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // formatTime
  // const formatTime = (milliseconds) => {
  //   const seconds = Math.floor(milliseconds / 1000) % 60;
  //   const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  //   const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  //   const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  //   const pad = (value) => (value < 10 ? `0${value}` : value);

  //   let formattedTime = '';

  //   if (days > 0) {
  //     formattedTime += `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  //   } else if (hours > 0) {
  //     formattedTime += `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  //   } else if (minutes > 0) {
  //     formattedTime += `${pad(minutes)}:${pad(seconds)}`;
  //   } else {
  //     formattedTime += `00:${pad(seconds)}`;
  //   }

  //   return formattedTime;
  // };

  return (
    <React.Fragment>
      {/* Time Remaining: {formatTime(timeRemaining)} */}
      Ready {moment(endTime).fromNow()}
    </React.Fragment>
  );
};

export default Timer;