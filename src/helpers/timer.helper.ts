import dayjs, { Dayjs } from "dayjs";
import type React from "react";

export const timer = (
  setTime: (time: string[]) => void,
  timeRef: React.MutableRefObject<number | null>,
  startDate: Dayjs
) => {
  const time = timeRef.current;
  return setInterval(() => {
    
    const newTime =
     (time || 0) + dayjs.duration(dayjs().diff(startDate)).asMilliseconds();
    setTime(secondsToTimeArr(newTime));
    timeRef.current = newTime;
  }, 1000);
}

export const secondsToTimeArr = (ms: number) =>
  dayjs.duration(ms).format("HH:mm:ss").split(":");
