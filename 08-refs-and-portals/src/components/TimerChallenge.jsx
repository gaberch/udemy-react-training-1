import { useState, useRef, useTransition } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
  
  const dialog = useRef();
  const timer = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    handleStop();
  }

  function handleReset() {
    setTimeRemaining(targetTime*1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    setTimerStarted(true);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
    <ResultModal 
      ref={dialog} 
      targetTime={targetTime} 
      remainingTime={timeRemaining}
      onReset={handleReset}
    />
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1? 's': ''}
      </p>
      <p>
        <button onClick={timerIsActive? handleStop: handleStart}>
          {timerIsActive ? 'Stop': 'Start'} Challenge
        </button>
      </p>
      <p className={timerIsActive? 'active': undefined}>
        {timerIsActive? 'Time is running...': 'Timer inactive'}
      </p>
    </section>
    </>
  )
}