/* global JSX*/
import classNames from 'classnames';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

import { FieldError } from 'react-hook-form';

import styles from './CheckBox.module.scss';

type errorType = FieldError | null;

export interface ICheckBox {
  id: string;
  className?: string;
  name: string;
  text: ReactNode | string | null | undefined;
  error: errorType;
  rounded?: boolean | undefined;
  defaultChecked?: boolean;
  color?: 'default' | 'primary';
  [prop: string]: any;
}

const CheckBox = forwardRef(
  (
    {
      id,
      name,
      text,
      error,
      rounded,
      defaultChecked = true,
      className,
      color,
      ...props
    }: ICheckBox,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const getCheckboxClassName = (color): string => {
      const checkboxClass: string = classNames(
        styles['checkbox-wrapper'],
        className,
        {
          [styles['checkbox-primary']]: color === 'primary',
          [styles['checkbox-default']]: color === 'default',
          [styles['checkbox-rounded']]: rounded,
        }
      );
      return checkboxClass;
    };

    const checkboxClassName: string = getCheckboxClassName(color);

    const checkboxClass: string = classNames(checkboxClassName);
    return (
      <div className={checkboxClass}>
        <input
          type='checkbox'
          id={id}
          name={name}
          ref={ref}
          defaultChecked={defaultChecked}
          {...props}
        />
        <label htmlFor={id} className={styles['checkbox-label']}>
          {text}
        </label>
        {error && (
          <span className={styles['checkbox-errorMsg']}>{error.message}</span>
        )}
      </div>
    );
  }
);

export default CheckBox;
