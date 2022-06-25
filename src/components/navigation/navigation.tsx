/* global JSX*/

import { navigationList } from 'configure';
import { NavItem } from '@components/NavItem';

import styles from './navigation.module.scss';

export default function Navigation({ onClickNavigation }): JSX.Element {
  return (
    <>
      <nav className={styles['navigation']} onClick={onClickNavigation}>
        <ul className={styles.navUl}>
          {navigationList.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </>
  );
}
