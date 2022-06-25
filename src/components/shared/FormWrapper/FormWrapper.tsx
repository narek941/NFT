/* global JSX*/
import classNames from 'classnames';
import { FormEventHandler } from 'react';
import { IChildren } from 'src/types/general';

import styles from './FormWrapper.module.scss';

interface IOnSubmit {
  className?: string;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export default function FormWrapper({
  onSubmit,
  children,
  className,
  ...props
}: IChildren & IOnSubmit): JSX.Element {
  const formClass: string = classNames(styles.wrapper, className);
  return (
    <form className={formClass} {...props} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
