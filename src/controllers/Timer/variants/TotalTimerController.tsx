import dayjs from "dayjs";
import React, {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { api } from "src/api";
import type { TimerP } from "src/components/Timer/Timer.component";
import { secondsToTimeArr } from "src/helpers/timer.helper";
import type { RCP } from "types/global";
import type { MainTimerContollerP } from "./MainTimer.controller";

export interface TotalTimerContollerP extends RCP, MainTimerContollerP {}
const timer = (...any: any[]) => {}
export const TotalTimer = ({ children, title = "" }: TotalTimerContollerP) => {
  const [time, setTime] = useState<string[]>(["00", "00", "00"]);
  const [timerStarted, setTimerStarted] = useState(false);
  const interval = useRef<NodeJS.Timer>();
  const initialTime = useRef<number | null>(0);

  const getInitialData = useCallback(async () => {
    const timepoints = await api.time.getTodayTimepoints();
    if (!timepoints.status) {
      initialTime.current = null;
      return;
    }

    const currentTime = timepoints.calculatedTime.total;
    setTime(secondsToTimeArr(currentTime));

    initialTime.current = currentTime;

    const mainPoints = timepoints?.time?.filter(
      (point) => point?.type === "main"
    );

    if (mainPoints?.[mainPoints.length - 1].state === "start") {
      setTimerStarted(true);
    }
  }, []);

  useEffect(() => {
    getInitialData();
    return () => clearInterval(interval.current);
  }, [getInitialData]);

  return cloneElement(children as ReactElement<TimerP>, {
    time,
    started: timerStarted,
    title,
    disabled: true,
  });
};
