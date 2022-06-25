/* global JSX*/
import { ForwardedRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import FailedInputIcon from 'public/field-icons/failed-input.svg';
import ValidInputIcon from 'public/field-icons/valid-input.svg';

import styles from './TextArea.module.scss';
import classNames from 'classnames';

type errorType = FieldError | null;

interface ITextArea {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  error?: errorType;
  maxLength?: number;
  isValid?: boolean;
  size?: 'l';
  className?: string;
}

const TextArea = forwardRef(
  (
    {
      error,
      size,
      maxLength,
      isValid,
      labelText,
      className,
      ...props
    }: ITextArea,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    const getTextAreaClassName = (size?: string): string => {
      const TextAreaClass: string = classNames(
        styles.textArea,

        { [styles['textarea-large']]: size === 'l' }
      );
      return TextAreaClass;
    };

    const TextAreaClassName: string = getTextAreaClassName(size);

    return (
      <div className={classNames(styles['textArea-wrapper'], className)}>
        {labelText && (
          <label htmlFor={props.name} className={styles.label}>
            {labelText}
          </label>
        )}
        <textarea
          className={TextAreaClassName}
          autoComplete='off'
          maxLength={maxLength}
          ref={ref}
          {...props}
        />
        {isValid && (
          <ValidInputIcon
            className={classNames(
              styles['input-icon-validation'],
              styles['icon'],
              isValid && styles['input-icon-valid']
            )}
          />
        )}
        {error && (
          <FailedInputIcon
            className={classNames(
              styles['input-icon-validation'],
              styles['icon'],
              styles['input-icon-error']
            )}
          />
        )}
        {error && <span className={styles['errorMsg']}>{error.message}</span>}
      </div>
    );
  }
);

export default TextArea;
