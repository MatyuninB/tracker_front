import React, { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { RCP } from "types/global";
import style from "./Test.module.css";
import type { TimePoint } from "types/timepoint";
import { CommonIconBtn } from "src/components/IconButton/variants/commonIconBtn/CommonIconBtn.component";
import { Timer } from "src/components/Timer/Timer.component";
import { TimerController } from "src/controllers/Timer/Timer.controller";
import { Snackbar } from "src/components/Snackbar/Snackbar.component";
import { useSnack } from "src/controllers/Snackbar/hooks/useSnack";

interface TestPageP extends RCP {}

export const TestPage = () => {
  const {alert, error} = useSnack();

  useEffect(() => {
    alert('avova1', "error");
    error("error", "error1");
    alert('error3', "avovs")
  }, []);

  return (
    <div className={style.wrapper}>
      <TimerController variant="timer" title="main">
        <Timer />
      </TimerController>
      <TimerController variant="timer" title="aboba-1">
        <Timer />
      </TimerController>
      <CommonIconBtn />
      <CommonIconBtn variant="trash" />
    </div>
  );
};
