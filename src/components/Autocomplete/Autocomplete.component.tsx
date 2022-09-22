import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import type { BaseSyntheticEvent, HTMLAttributes } from "react";
import styles from "./Autocomplete.module.css";
import clsx from "clsx";
import { Input, InputP } from "../Input/Input.component";
import { MenuItem } from "../MenuItem/MenuItem.component";
import { Menu } from "../Menu/Menu.component";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface AutocompleteP<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: string;
  options: SelectOption<T>[];
  width?: string;
  placeholder?: string;
  onSelect?: (e: BaseSyntheticEvent, value: SelectOption<T>) => void;
  placement: "top" | "bottom";
  onRequestOptions?: (value: string) => void;
  inputLabel?: string;
  state?: InputP["state"]
}

export const Autocomplete = <T,>({
  value: label = "",
  options,
  placeholder,
  onSelect,
  tabIndex = 1,
  placement = "bottom",
  width,
  onRequestOptions,
  inputLabel,
  state
}: AutocompleteP<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(label);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(label);
  }, [label]);

  const handleOpen = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setOpen(true);
    onRequestOptions && onRequestOptions(inputValue);
  };

  const handleClose = (e: BaseSyntheticEvent) => {
    setOpen(false);
    console.log('ger', inputRef?.current?.value, onSelect)
    inputRef?.current?.value &&
      onSelect?.(e, {
        label: inputRef?.current?.value,
        value: inputRef?.current?.value as T,
      });
  };

  const handleSelect = (
    e: BaseSyntheticEvent,
    options?: { label: string; value: SelectOption<T> }
  ) => {
    options?.value && onSelect?.(e, options?.value);
    setOpen(false);
    setInputValue(label);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onRequestOptions && onRequestOptions(inputValue);
  };



  return (
    <>
    <Input
        className={clsx(styles.autocomplete, { [styles.active]: open })}
        width={width}
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleOpen}
        tabIndex={tabIndex}
        label={inputLabel}
        state={state}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.keyCode === 13 && handleClose(e)}
      />
      {open && (
        <Menu
          anchor={inputRef.current as Element}
          placement={placement}
          onBackdropClick={handleClose}
        >
          {!!options.length && options.map((option: SelectOption<T>, idx: number) => (
            <MenuItem<SelectOption<T>>
              label={option.label}
              value={option}
              tabIndex={idx + 1 + tabIndex}
              onValueSelect={handleSelect}
              key={`Autocomplete-option${idx}`}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};
