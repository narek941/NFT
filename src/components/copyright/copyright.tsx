/* global JSX*/
import styles from './copyright.module.scss';

export default function Copyright(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={styles.copyright}
    >{`Copyright ©${currentYear}. All rights reserved`}</div>
  );
}
