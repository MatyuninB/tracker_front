import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import type { RCP } from "types/global";
import style from "./Card.module.css";

export interface CardP extends RCP, HTMLAttributes<HTMLDivElement> {}

export const Card = ({ children, className, ...props }: CardP) => (
  <div className={clsx(style.card, className)}>{children}</div>
);
