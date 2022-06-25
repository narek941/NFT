/* global JSX*/
import { ReactNode } from 'react';

import styles from './ModalIconPlaceholder.module.scss';
import classNames from 'classnames';

interface IModalProps {
  children: ReactNode | string;
  className?: string;
}

export default function ModalIconPlaceholder({
  children,
  className,
}: IModalProps): JSX.Element {
  return (
    <div className={classNames(className, styles.container)}>{children}</div>
  );
}
