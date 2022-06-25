/* global JSX*/
import styles from './ModalSubtitle.module.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface IModalSubtitle {
  text: string | ReactNode;
  style?: 'bold';
  className?: string;
}

export default function ModalSubtitle({
  text,
  style,
  className,
}: IModalSubtitle): JSX.Element {
  const subTitleClasses = classNames(styles.subTitleStyles, className, {
    [styles['bold']]: style,
  });

  return <div className={subTitleClasses}>{text}</div>;
}
