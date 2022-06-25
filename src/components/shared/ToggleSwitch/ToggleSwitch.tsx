/* global JSX*/
import React, { ReactNode } from 'react';
import { ForwardedRef, forwardRef } from 'react';
import styles from './ToggleSwitch.module.scss';

import classNames from 'classnames';
import { FieldError, UseFormRegister } from 'react-hook-form';

type errorType = FieldError | null;
export interface IToggleSwitch {
  id: string;
  name: string;
  text?: ReactNode | string;
  error: errorType;
  rounded?: boolean | undefined;
  defaultChecked?: boolean;
  register: UseFormRegister<any>;
}
const ToggleSwitch = ({
  id,
  name,
  text,
  error,
  rounded,
  register,
  defaultChecked,
  ...props
}: IToggleSwitch): JSX.Element => {
  return (
    <>
      <label htmlFor={id} className={styles['toggleSwitch-label']}>
        {text}
      </label>
      <div className={styles.switch}>
        <input
          type='checkbox'
          id={id}
          {...register(name)}
          defaultChecked={defaultChecked}
          {...props}
        />
        <span className={classNames(styles.slider, styles.round)}></span>
      </div>
    </>
  );
};

export default ToggleSwitch;
