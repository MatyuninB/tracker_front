import React from "react";
import type { BaseSyntheticEvent, ReactNode } from "react";
import type { RCP } from "types/global";
import { createPortal } from "react-dom";
import { Backdrop } from "../Backdrop/Backdrop.component";


export interface PortalP extends RCP {
  children: ReactNode;
  onBackdropClick?: (e: BaseSyntheticEvent) => void;
  transparentBackground?: boolean;
}

export const Portal = (props: PortalP) => {
  const body = document.querySelector("body");
  return body && createPortal(<Backdrop {...props} />, body);
}