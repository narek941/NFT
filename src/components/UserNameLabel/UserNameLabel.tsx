/* global JSX*/
import styles from './UserNameLabel.module.scss';

interface ITextChildren {
  children: string;
}

export default function UserNameLabel({
  children,
}: ITextChildren): JSX.Element {
  return <div className={styles.userNameLabel}>{children}</div>;
}
