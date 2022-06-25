import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import styles from './header.module.scss';
import HeaderNavigation from './headerNavigation';

const restrictionPathnames = ['/maintenance-mode'];

export default function Header() {
  const router = useRouter();
  const [headerClassName, setHeaderClassName] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset >= 80) {
      setHeaderClassName(true);
    } else if (window.pageYOffset < 80) {
      setHeaderClassName(false);
    }
  };

  if (restrictionPathnames.includes(router.pathname)) return null;

  return (
    <header
      className={classNames(
        styles.header,
        headerClassName && styles.headerScroll
      )}
    >
      <HeaderNavigation />
    </header>
  );
}
