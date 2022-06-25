/* global JSX*/
import { IChildren } from 'src/types/general';

import styles from './SocialIconPlaceholder.module.scss';

export default function SocialIconPlaceholder({
  children,
}: IChildren): JSX.Element {
  return <div className={styles.placeholder}>{children}</div>;
}
