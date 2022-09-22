import React, { CSSProperties, useMemo, useRef } from "react";
import type { BaseSyntheticEvent, HTMLAttributes } from "react";
import style from "./Menu.module.css";
import { Portal } from "../Portal/Portal.component";

export interface Rect {
  top?: number;
  left?: number;
  width?: number;
}

export interface MenuP extends HTMLAttributes<HTMLDivElement> {
  anchor?: Element;
  transparentBackground?: boolean;
  rect?: Rect;
  onBackdropClick?: (e: BaseSyntheticEvent) => void;
  maxHeight?: string;
  placement?: "top" | "bottom";
}

export const Menu = ({
  children,
  onBackdropClick,
  rect,
  anchor,
  maxHeight = "350px",
  placement = "bottom",
}: MenuP) => {
  const ref = useRef<HTMLMenuElement | null>(null);

  const position = useMemo(() => {
    if (anchor) {
      const { left, top, width, height } = anchor.getClientRects()?.[0];

      switch (placement) {
        case "bottom":
          return { left, top: top + height / 1.5, width };
        case "top":
          return {
            left,
            top: top - height / 2.5,
            transform: "translateY(-100%)",
            width,
          };
      }
    }
    return rect;
  }, [rect, anchor]);
  const heightVar = { "--max-height": maxHeight } as CSSProperties;
  return (
    <Portal transparentBackground onBackdropClick={onBackdropClick}>
      <menu
        ref={ref}
        style={{ ...position, ...heightVar } as CSSProperties}
        className={style.menu}
      >
        {children}
      </menu>
    </Portal>
  );
};
