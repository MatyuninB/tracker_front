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
import type { TimeEntity } from "src/api/types/time.type";
import type { TimelineP } from "src/components/Timeline/Timeline.component";
import { timeActions } from "src/store/actions/time.actions";
import { timeLoadingSelector, timepointsSelector } from "src/store/selectors/time.selector";
import type { RCP } from "types/global";

export interface TimelineContollerP extends RCP {}

export const TimelineController = ({ children }: TimelineContollerP) => {
  const [time, setTime] = useState<TimeEntity[]>([]);
  const timepoints = useSelector(timepointsSelector);
  const timeLoadingState = useSelector(timeLoadingSelector);
  const dispatch = useDispatch();

  const getInitialData = useCallback(() => {
    if (timeLoadingState === 'fullfield') {
      if (!timepoints?.status) return;
      setTime(timepoints?.time ?? []);
    }
    if (!timeLoadingState) {
      dispatch(timeActions.getTodayTime())
    }
  }, [timeLoadingState, timepoints]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return cloneElement(children as ReactElement<TimelineP>, {
    time,
  }) 
};
