import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TextHelper.module.scss';

interface ITextHelperProps {
  title?: string;
  children?: ReactNode | string;
  className?: string;
}
const TextHelper = ({ title, children, className }: ITextHelperProps) => {
  const textHelperClass: string = classNames(styles.textHelper, className);
  return (
    <div className={textHelperClass}>
      {title && <div className='h6'>{title}</div>}
      {children}
    </div>
  );
};

export default TextHelper;
