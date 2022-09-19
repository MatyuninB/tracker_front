import React from "react";
import type { RCP } from "types/global";
import {
  MainTimer,
  MainTimerContollerP,
} from "./variants/MainTimer.controller";
import { TotalTimer } from "./variants/TotalTimerController";

interface TimerContollerP extends RCP, MainTimerContollerP {
  variant: "timer" | "total";
}

export const TimerController = ({ variant, ...props }: TimerContollerP) =>
  variant === "timer" ? <MainTimer {...props} /> : <TotalTimer {...props} />;
