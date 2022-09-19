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
import { useSnack } from "src/controllers/Snackbar/hooks/useSnack";
import { secondsToTimeArr, timer } from "src/helpers/timer.helper";
import type { RCP } from "types/global";

export interface MainTimerContollerP extends RCP {
  title?: string;
  projectId?: string;
  description?: string;
  disabled?: boolean;
}

export const MainTimer = ({ children, title = "",  disabled }: MainTimerContollerP) => {
  const [time, setTime] = useState<string[]>(["00", "00", "00"]);
  const [timerStarted, setTimerStarted] = useState(false);
  const interval = useRef<NodeJS.Timer>();
  const initialTime = useRef<number | null>(0);
  const {alert, error} = useSnack();

  const getInitialData = useCallback(async () => {
    const timepoints = await api.time.getTodayTimepoints();
    if (!timepoints.status) {
      initialTime.current = null;
      return;
    }
    
    const currentTime = timepoints.calculatedTime.timers.find(
      (e: { [key: string]: string }) => e.title === title
    ).time;


    initialTime.current = currentTime;

    const mainPoints = timepoints?.time?.filter(
      (point: { [key: string]: string }) => point?.type === "main" && title === point.title
    );

    if (mainPoints[mainPoints.length - 1].state === "start") {
      setTimerStarted(true);
      const curentTime = dayjs().diff(dayjs(mainPoints[mainPoints.length - 1].time));
      if (curentTime && initialTime.current) initialTime.current += curentTime;
      interval.current = timer(setTime, initialTime, dayjs());
    } else {
      setTime(secondsToTimeArr(currentTime));
    }
  }, []);

  useEffect(() => {
    getInitialData();
    return () => clearInterval(interval.current);
  }, [getInitialData]);

  const onClick = useCallback(async (state) => {
    try {
      if (state) {
        await api.time.changeMainState({ state: "start", title: title });
        if (!initialTime.current) initialTime.current = 0;
        interval.current = timer(setTime, initialTime, dayjs());
      } else {
        await api.time.changeMainState({ state: "stop", title: title });
        clearInterval(interval.current);
      }
      setTimerStarted(state);
    } catch (e) {
      console.dir(e)
      error("Timer Error", (e as Error).message);
    }
  }, []);

  return cloneElement(children as ReactElement<TimerP>, {
    time,
    onStateChange: onClick,
    started: timerStarted,
    title,
    disabled,
  });
};
