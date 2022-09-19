import clsx from "clsx";
import React, {
  cloneElement,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import type { RCP } from "types/global";
import style from "./Typography.module.css";

export interface TypographyP
  extends RCP,
    HTMLAttributes<
      HTMLParagraphElement | HTMLSpanElement | HTMLHeadingElement
    > {
  variant?: ReactElement;
  bold?: boolean;
  fontSize?: string;
}

export const Typography = ({
  variant = <p />,
  bold,
  fontSize,
  className,
  ...props
}: TypographyP) =>
  cloneElement(variant, {
    className: clsx(className, style.typography, { [style.bold]: bold }),
    style: { "--font-size": fontSize },
    ...props,
  });
