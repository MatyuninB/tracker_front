import React, { useLayoutEffect, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { RCP } from "types/global";
import { Typography } from "../Typography/Typography.component";
import clsx from "clsx";
import { Divider } from "../Divider/Divider.component";

import style from "./Snackbar.module.css";
import { sleep } from "src/helpers/sleep.helper";

export interface SnackbarP extends RCP {
  title?: string;
  description?: string;
  variant?: "alert" | "error";
  count?: number;
  fadeOut?: boolean;
}

const body = document.querySelector("body");

export const Snackbar = ({
  title,
  description,
  variant,
  count,
  ...props
}: SnackbarP) =>
  body &&
  createPortal(
    <div
      style={{ "--count": count } as CSSProperties}
      className={clsx(style.snackbar, {
        [style.error]: variant === "error",
      })}
      {...props}
    >
      <Typography className={style.title}>{title}</Typography>
      <Divider />
      <Typography fontSize="0.8rem" className={style.description}>
        {description}
      </Typography>
    </div>,
    body,
    `snack-bar_${title}_${count}`
  );
