/* global JSX*/
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import styles from './NavItemWrapper.module.scss';

export interface NavItemWrapperProps {
  children: ReactNode | string;
  className?: string;
}
export default function NavItemWrapper({
  className,
  children,
}: NavItemWrapperProps): JSX.Element {
  return <li className={classNames(styles.navLi, className)}>{children}</li>;
}
