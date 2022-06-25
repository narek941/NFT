/* global JSX*/
import { ForwardedRef, forwardRef } from 'react';

import { FieldError } from 'react-hook-form';

import styles from './RadioBox.module.scss';

type errorType = FieldError | null;

interface IRadioBox {
  id: string;
  name: string;
  text: string;
  error: errorType;
}

const RadioBox = forwardRef(
  (
    { id, name, text, error, ...props }: IRadioBox,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={styles['radio-wrapper']}>
        <input type='radio' id={id} name={name} ref={ref} {...props} />
        <label htmlFor={id} className={styles['radio-label']}>
          {text}
        </label>
        {error && (
          <span className={styles['radio-errorMsg']}>{error.message}</span>
        )}
      </div>
    );
  }
);

export default RadioBox;
