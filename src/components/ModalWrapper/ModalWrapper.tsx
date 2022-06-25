/* global JSX*/
import { IModalWrapperProps } from 'src/types/general';

import styles from './ModalWrapper.module.scss';
import classNames from 'classnames';

export default function ModalWrapper({
  className,
  children,
}: IModalWrapperProps): JSX.Element {
  const modalclassName = classNames(styles.mainStyles, className);
  return <div className={modalclassName}>{children}</div>;
}
