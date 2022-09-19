import React from "react";
import type { HTMLAttributes } from "react";
import type { RCP } from "types/global";
import { IconButton, IconButtonP } from "../../IconButton.component";
import { StartIcon } from "./assets/Start.icon";
import { StopIcon } from "./assets/Stop.icon";

export interface TimeControlBtnP
  extends IconButtonP,
    RCP {
  action: "start" | "stop";
}

export const TimeControlBtn = ({ action, ...props }: TimeControlBtnP) => {
  return (
    <IconButton
      icon={action === "start" ? <StartIcon /> : <StopIcon />}
      round
      {...props}
    />
  );
};
