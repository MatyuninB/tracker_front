import React from 'react';
import type { BaseSyntheticEvent, ReactNode } from 'react';
import style from './Backdrop.module.css';
import clsx from 'clsx';



export interface BackdropP {
  children: ReactNode;
  onBackdropClick?: (e: BaseSyntheticEvent) => void;
  transparentBackground?: boolean;
}

export const Backdrop = ({
  children,
  onBackdropClick,
  transparentBackground,
}: BackdropP) => {
  return (
    <div
      onClick={onBackdropClick}
      className={clsx(style.backdrop, {
        [style.transparent]: transparentBackground,
      })}
    >
      {children}
    </div>
  );
};
