/* global JSX*/
import { IChildren } from 'src/types/general';

import styles from './ModalContentWrapper.module.scss';

export default function ModalContentWrapper({
  children,
}: IChildren): JSX.Element {
  return <div className={styles.mainStyles}>{children}</div>;
}
