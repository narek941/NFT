import { ForwardedRef, forwardRef } from 'react';
import Input from '@shared/Input';
import { FieldError } from 'react-hook-form';

import styles from './InputWithLabel.module.scss';
import classNames from 'classnames';

type errorType = FieldError | null;

interface IInputWithLabel {
  labelText: string;
  name: string;
  placeholder: string;
  id: string;
  customType?: string;
  hasForgotPassword?: boolean;
  error?: errorType;
  isValid?: boolean;
  className?: string;
  onFocus?: Function;
  size?: 's' | 'm' | 'l';
}

const InputWithLabel = forwardRef(
  (
    { className, labelText, size, ...props }: IInputWithLabel,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const labelWrapperClass: string = classNames(styles.general, className);
    return (
      <div className={labelWrapperClass}>
        <label htmlFor={props.name} className={styles.label}>
          <span className={styles['label-text']}>{labelText}</span>
          <Input size={size} ref={ref} {...props} />
        </label>
      </div>
    );
  }
);

export default InputWithLabel;
