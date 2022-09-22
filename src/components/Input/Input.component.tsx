import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  LegacyRef,
  MutableRefObject,
  ReactNode,
  useRef,
} from "react";
import style from "./Input.module.css";
import clsx from "clsx";
import type { RCP } from "types/global";

export interface InputP extends RCP, HTMLAttributes<HTMLInputElement> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  state?: "success" | "error" | "none" | undefined;
  width?: string;
  ref?: MutableRefObject<HTMLDivElement>;
  label?: string;
  value?: string;
}

export const Input = forwardRef(
  (
    {
      startAdornment,
      endAdornment,
      state,
      width,
      className,
      ref: _,
      onClick,
      onFocus,
      label,
      ...props
    }: InputP,
    ref
  ) => {
    const id = useRef(Math.round(Math.random() * 1000).toString());
    return (
      <div
        onClick={onClick}
        onFocus={onFocus}
        className={clsx(
          style.input_wrapper,
          {
            [style.error]: state === "error",
            [style.success]: state === "success",
          },
          className
        )}
        style={{ "--input-width": width } as CSSProperties}
      >
        {startAdornment}
        <label className={style.label} htmlFor={id.current}>
          {label}
        </label>
        <input
          ref={ref as LegacyRef<HTMLInputElement>}
          className={style.input}
          {...props}
        />
        {endAdornment}
      </div>
    );
  }
);
