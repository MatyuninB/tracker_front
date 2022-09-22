import React, { KeyboardEvent, MouseEvent, ReactElement } from 'react';
import style from './MenuItem.module.css';
import type { BaseSyntheticEvent, HTMLAttributes } from 'react';

export interface MenuItemP<T> extends HTMLAttributes<HTMLLIElement> {
  label: string;
  value?: T;
  onValueSelect: (
    e: BaseSyntheticEvent,
    options?: { label: string; value: T }
  ) => void;
}


export const MenuItem = <T,>({
  value,
  label,
  children,
  onValueSelect = () => {},
  ...props
}: MenuItemP<T>): ReactElement => {
  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    console.log(label, value)
    value && onValueSelect(e, {label, value});
  };

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.keyCode === 13 && value) {
      onValueSelect(e, {label, value});
    }
  };

  return (
    <li
      role="tab"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={style.menu_item}
      {...props}
    >
      {label || children}
    </li>
  );
};
