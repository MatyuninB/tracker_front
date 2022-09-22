import dayjs from "dayjs";
import type { BaseContructor } from "../types/base";
import type { TotalTime } from "../types/time.type";
import { EndpointBase } from "./abstract/Base.endoint";

export type TimerState = "stop" | "start" | "sub-start" | "sub-stop"

export interface ChangeStaitDTO {
  state: TimerState;
  title?: string;
  time?: string;
  projectId?: string;
  description?: string;
};

export class Time extends EndpointBase {
  lastTime: { 
    time?: string;
    state?: TimerState;
  }

  constructor(params: BaseContructor) {
    super(params);
    this.lastTime = {}
  }

  public getTodayTimepoints(): Promise<TotalTime> {
    return this.request({
      method: "get",
      endpoint: "time/time-point",
      query: { date: dayjs().toISOString() },
    });
  }

  public addTimeController({type, ...params}: ChangeStaitDTO & { type: "main" | "sub"}) {
    if (type === "main") {
      return this.changeMainState(params);
    }
  }

  public changeMainState({ state, title }: ChangeStaitDTO) {
    const time = dayjs().toISOString();
    this.lastTime.state = state;
    this.lastTime.time = time;
  
    return this.request({
      method: "post",
      endpoint: "time/add",
      body: JSON.stringify({
        type: 'main',
        state,
        time,
        title
      })
    });
  }
}
