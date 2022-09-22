import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { processTick, secondsToTimeArr } from "src/helpers/timer.helper"
import { timeActions } from "src/store/actions/time.actions";

export const useTimer = () => {
  const [time, setTime] = useState<string[]>(["00", "00", "00"]);
  const currentTime = useRef<number | null>(0);
  const dispatch = useDispatch();
  const startTimer = useRef(dayjs());

  const timer = () => {
    const newTime  = processTick(currentTime.current, startTimer.current);
    setTime(secondsToTimeArr(newTime));
  };

  const onTimerStart = () => {
    startTimer.current = dayjs();
    window.addEventListener("timer_tick", timer);
  }

  const onTimerStop = () => {
    dispatch(timeActions.getTodayTime());
    window.removeEventListener('timer_tick', timer);
  }

  useEffect(() => {
    return () => window.removeEventListener('timer_tick', timer);
  }, []);

  return { time, currentTime, setTime, onTimerStart, onTimerStop };
}