import { IsDate, IsIn, IsOptional, IsString } from "class-validator";
import { TimeState } from "../entities/time.entity.";

export interface TimePoint {
  type: "main" | "sub";

  state: TimeState;

  time: Date;

  projectId: number;

  subtask?: string;

  description?: string;

  title?: string;
}
