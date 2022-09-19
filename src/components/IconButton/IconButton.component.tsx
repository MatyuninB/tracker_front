import React, { HTMLAttributes } from "react";
import type { HTMLProps, ReactNode } from "react";
import type { RCP } from "types/global";
import styles from "./IconButton.module.css";
import clsx from "clsx";

export interface IconButtonP extends HTMLAttributes<HTMLButtonElement>, RCP {
  icon?: ReactNode;
  round?: boolean;
  disabled?: boolean;
}

export const IconButton = ({ icon, round, className, ...props }: IconButtonP) => {
  return (
    <button
      className={clsx(className, styles.button, {
        [styles.round]: round,
        [styles.square]: !round,
      })}
      {...props}
    >
      {icon}
    </button>
  );
};
