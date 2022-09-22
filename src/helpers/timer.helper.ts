import dayjs, { Dayjs } from "dayjs";
import type React from "react";

export const processTick = (
  time: number | null,
  startDate: Dayjs
) => {
  return getPastTime(startDate, time);
};

export const getPastTime = (start: Dayjs, time?: number | null) => (time || 0) + dayjs.duration(dayjs().diff(start)).asMilliseconds()

export const secondsToTimeArr = (ms: number) =>
  dayjs.duration(ms).format("HH:mm:ss").split(":");

export class Timer {
  interval: NodeJS.Timer;
  constructor() {
    this.interval = setInterval(() => this.emit(), 1000);
  }

  private emit() {
    const event = new Event("timer_tick");

    window.dispatchEvent(event);
  }
}
