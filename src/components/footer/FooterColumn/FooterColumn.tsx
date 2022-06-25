/* global JSX*/
import styles from './FooterColumn.module.scss';

import { IChildren } from 'src/types/general';

import classNames from 'classnames';

interface IFooterColumn extends IChildren {
  alignContent: 'left' | 'center' | 'right';
}

export default function FooterColumn({
  alignContent,
  children,
}: IFooterColumn): JSX.Element {
  const combinedStyle =
    (alignContent === 'left' && styles.contentLeft) ||
    (alignContent === 'center' && styles.contentCenter) ||
    (alignContent === 'right' && styles.contentRight);

  return (
    <div className={classNames(styles['footer-column'], combinedStyle)}>
      {children}
    </div>
  );
}

FooterColumn;
