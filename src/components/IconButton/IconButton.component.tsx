import React, { CSSProperties, HTMLAttributes } from "react";
import type { HTMLProps, ReactNode } from "react";
import type { RCP } from "types/global";
import styles from "./IconButton.module.css";
import clsx from "clsx";

export interface IconButtonP extends HTMLAttributes<HTMLButtonElement>, RCP {
  icon?: ReactNode;
  round?: boolean;
  disabled?: boolean;
  size?: string;
  type?: "submit" | "reset"
}

export const IconButton = ({ icon, round, className, children, size, ...props }: IconButtonP) => {
  return (
    <button
      style={{ "--size": size} as CSSProperties}
      className={clsx(className, styles.button, {
        [styles.round]: round,
        [styles.square]: !round,
      })}
      {...props}
    >
      {icon || children}
    </button>
  );
};
