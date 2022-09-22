import dayjs from "dayjs";
import React, {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "src/api";
import type { TimerP } from "src/components/Timer/Timer.component";
import { useSnack } from "src/controllers/Snackbar/hooks/useSnack";
import { getPastTime, secondsToTimeArr } from "src/helpers/timer.helper";
import { useTimer } from "src/hooks/useTimer.hook";
import { timeActions } from "src/store/actions/time.actions";
import { timeLoadingSelector, timepointsSelector } from "src/store/selectors/time.selector";
import type { RCP } from "types/global";

export interface MainTimerContollerP extends RCP {
  title?: string;
  projectId?: string;
  description?: string;
  disabled?: boolean;
}

export const MainTimer = ({ children, title = "",  disabled }: MainTimerContollerP) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const { time, currentTime, setTime, onTimerStart, onTimerStop } = useTimer();
  const { error } = useSnack();
  const dispatch = useDispatch();
  const timepoints = useSelector(timepointsSelector);
  const loadingState = useSelector(timeLoadingSelector);
  

  const getInitialData = useCallback(async () => {
    if (!loadingState) dispatch(timeActions.getTodayTime())
    if (loadingState !== "fullfield" || !timepoints) return;
    if (!timepoints.status) {
      currentTime.current = 0;
      return;
    }

    const taskTime = timepoints?.calculatedTime?.timers?.find(e => e.title === title)?.time || 0;
    const taskTimepoints = timepoints?.time?.filter(e => e.title === title);
    const lastTimepoint = taskTimepoints?.[taskTimepoints?.length - 1];
    const totalTime = lastTimepoint?.state === "stop" ? taskTime : taskTime + getPastTime(dayjs(lastTimepoint?.time))
    setTime(secondsToTimeArr(totalTime));
    currentTime.current = totalTime;
    if (lastTimepoint?.state === "start") {
      onTimerStart();
      setTimerStarted(true);
    }
  }, [timepoints, loadingState, timerStarted]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData, timepoints]);

  const onClick = useCallback(async (state) => {
    try {
      if (state) {
        await api.time.changeMainState({ state: "start", title: title });
        onTimerStart();
      } else {
        await api.time.changeMainState({ state: "stop", title: title });
        onTimerStop();
      }
      setTimerStarted(state);
    } catch (e) {
      error("Timer Error", (e as Error).message);
    }
  }, []);

  return cloneElement(children as ReactElement<TimerP>, {
    time,
    onStateChange: onClick,
    started: timerStarted,
    title,
    disabled,
    loading: loadingState === "pending",
  });
};
