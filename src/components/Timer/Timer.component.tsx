import clsx from "clsx";
import React, { useState } from "react";
import type { RCP } from "types/global";
import { Card } from "../Card/Card.component";
import { TimeControlBtn } from "../IconButton/variants/timeControl/TimeControl.component";
import { Typography } from "../Typography/Typography.component";
import style from "./Timer.module.css";

export interface TimerP extends RCP {
  onStateChange?: (state: boolean) => void;
  started?: boolean;
  time?: string[];
  title?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Timer = ({
  onStateChange,
  started = false,
  time = ["00", "00", "00"],
  title,
  disabled,
  loading,
}: TimerP) => {
  const handleStateChange = () => {
    const newState = !started;
    onStateChange?.(newState);
  };
 
  return (
    <Card className={clsx({[style.loading]: loading})}>
      {title && <Typography className={style.title}>{title}:</Typography>}
      <Typography className={style.count}>
        <Typography variant={<span />} bold fontSize="2rem">
          {time[0]}
        </Typography>
        <Typography
          className={clsx({ [style.blink]: started })}
          variant={<span />}
          bold
          fontSize="2rem"
        >
          :
        </Typography>
        <Typography variant={<span />} bold fontSize="2rem">
          {time[1]}
        </Typography>
        <Typography
          className={clsx({ [style.blink]: started })}
          variant={<span />}
          bold
          fontSize="2rem"
        >
          :
        </Typography>
        <Typography variant={<span />} bold fontSize="2rem">
          {time[2]}
        </Typography>
      </Typography>
      <TimeControlBtn
        disabled={disabled}
        action={!started ? "start" : "stop"}
        onClick={handleStateChange}
      />
    </Card>
  );
};
