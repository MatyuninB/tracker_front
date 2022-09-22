import dayjs from "dayjs";
import type { BaseContructor } from "../types/base";
import type { TotalTime } from "../types/time.type";
import { EndpointBase } from "./abstract/Base.endoint";

export class Task extends EndpointBase {
  constructor(params: BaseContructor) {
    super(params);
  }

  create({ title, description }: { title: string; description?: string }) {
    return this.request({
      endpoint: "task",
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }

  getAll() {
    return this.request({
      endpoint: "task",
      method: "GET",
    });
  }
}
