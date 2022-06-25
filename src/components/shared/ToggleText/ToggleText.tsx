/* global JSX*/
import React, { ReactNode } from 'react';
import styles from './ToggleText.module.scss';

import classNames from 'classnames';

export interface IToggleText {
  className?: string;
  onClick: () => void;
  children?: ReactNode | string;
}
const ToggleText = ({
  children,
  className,
  onClick,
}: IToggleText): JSX.Element => {
  return (
    <span className={classNames(styles.text, className)} onClick={onClick}>
      {children}
    </span>
  );
};

export default ToggleText;
