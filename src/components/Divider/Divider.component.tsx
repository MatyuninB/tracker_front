import React, { CSSProperties } from "react";
import type { HTMLAttributes } from "react";
import type { RCP } from "types/global";
import style from "./Divider.module.css";

export interface DividerP extends RCP, HTMLAttributes<HTMLHRElement> {
  color?: string;
}

export const Divider = ({ color, ...props }: DividerP) => (
  <hr
    style={{ "--color-divider": color } as CSSProperties}
    className={style.divider}
    {...props}
  />
);
