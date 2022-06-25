/* global JSX*/
import { ForwardedRef, forwardRef, useState } from 'react';
import Link from 'next/link';
import { FieldError } from 'react-hook-form';

import EyeIcon from 'public/field-icons/eye-off.svg';
import OpenEyeIcon from 'public/field-icons/eye-on.svg';
import FailedInputIcon from 'public/field-icons/failed-input.svg';
import ValidInputIcon from 'public/field-icons/valid-input.svg';

import styles from './Input.module.scss';
import classNames from 'classnames';

type errorType = FieldError | null;

interface IInput {
  id: string;
  name: string;
  placeholder: string;
  customType?: string;
  hasForgotPassword?: boolean;
  error?: errorType | undefined | null;
  maxLength?: number;
  isValid?: boolean;
  size?: 's' | 'm' | 'l';
  className?: string;
  pattern?: string;
  [prop: string]: any;
}

const Input = forwardRef(
  (
    {
      customType,
      hasForgotPassword,
      error,
      size,
      maxLength,
      isValid,
      className,
      pattern,
      ...props
    }: IInput,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [inputType, setInputType] = useState(() =>
      customType === 'password' ? 'password' : 'text'
    );

    function iconClickHandler(): void {
      if (inputType === 'text') setInputType('password');
      if (inputType === 'password') setInputType('text');
    }

    const getInputClassName = (size?: string): string => {
      const inputClass: string = classNames(
        styles.input,
        customType && styles['input-password'],
        props['disabled'] && styles['input-disabled'],
        {
          [styles['input-small']]: size === 's',
          [styles['input-medium']]: size === 'm',
          [styles['input-large']]: size === 'l',
        }
      );
      return inputClass;
    };

    const InputClassName: string = getInputClassName(size);

    return (
      <div
        className={classNames(
          styles.container,
          className && className,
          customType && styles['container-password']
        )}
      >
        {hasForgotPassword && (
          <Link href='/forgot-password'>
            <a className={styles.forgotPassLink}>Forgot Password?</a>
          </Link>
        )}
        <input
          className={InputClassName}
          type={inputType}
          autoComplete='off'
          maxLength={maxLength}
          ref={ref}
          pattern={pattern}
          {...props}
        />

        {isValid && !error && (
          <ValidInputIcon
            className={classNames(
              styles['input-icon'],
              styles['input-icon-validation'],
              isValid && styles['input-icon-valid']
            )}
          />
        )}
        {error && (
          <FailedInputIcon
            className={classNames(
              styles['input-icon'],
              styles['input-icon-validation'],
              styles['input-icon-error']
            )}
          />
        )}
        {customType === 'password' &&
          (inputType === 'password' ? (
            <EyeIcon
              className={classNames(
                styles['input-icon'],
                styles['input-icon-eye']
              )}
              onClick={iconClickHandler}
            />
          ) : (
            <OpenEyeIcon
              className={classNames(
                styles['input-icon'],
                styles['input-icon-eye']
              )}
              onClick={iconClickHandler}
            />
          ))}

        {error?.message && (
          <span className={styles['input-errorMsg']}>{error.message}</span>
        )}
      </div>
    );
  }
);

export default Input;
