/* global JSX*/
import { SyntheticEvent } from 'react';

import classNames from 'classnames';

import styles from './FormGroup.module.scss';

interface IFormGroup {
  children: JSX.Element | string;
  space?: 's' | 'm' | 'l';

  className?: string;
  onClick?: (e: SyntheticEvent) => void;
  disabled?: boolean;
}

export default function FormGroup({
  children,
  space,
  className,
  ...props
}: IFormGroup) {
  const getFormGroupClassName = (space?: string): string => {
    const formGroupClass: string = classNames(styles.formGroup, className, {
      [styles['space-small']]: space === 's',
      [styles['space-medium']]: space === 'm',
      [styles['space-large']]: space === 'l',
    });
    return formGroupClass;
  };

  const formGroupClassName: string = getFormGroupClassName(space);

  return (
    <div className={formGroupClassName} {...props}>
      {children}
    </div>
  );
}
