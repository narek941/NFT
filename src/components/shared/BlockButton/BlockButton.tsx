import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './BlockButton.module.scss';

export interface IBlockButton {
  children: ReactNode | string;
  className?: string;
}

function BlockButton({ children, className }: IBlockButton) {
  const blockButtonClass: string = classNames(
    styles['block-button'],
    className
  );
  return <div className={blockButtonClass}>{children}</div>;
}

export default BlockButton;
