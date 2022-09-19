import clsx from "clsx";
import React, { ReactComponentElement, ReactElement, ReactNode } from "react";
import { IconButton, IconButtonP } from "../../IconButton.component";
import { PlusIcon } from "./assets/Plus.icon";
import { ThrashIcon } from "./assets/Trash.icon";
import style from "./CommonIconBtn.module.css";

export interface CommonIconBtn extends IconButtonP {
  variant?: "trash" | "plus";
}

const IconMap = new Map<string, JSX.Element>([
  ["trash", <ThrashIcon />],
  ["plus", <PlusIcon />],
]);

export const CommonIconBtn = ({
  variant = "plus",
  ...props
}: CommonIconBtn) => {
  const icon = IconMap.get(variant) ;

  return (
    <IconButton
      icon={icon}
      className={clsx({ [style.red]: variant === "trash" })}
      {...props}
    />
  );
};
