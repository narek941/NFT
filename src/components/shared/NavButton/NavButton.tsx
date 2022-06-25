/* global JSX*/
import classNames from 'classnames';
import Link from 'next/link';

import styles from './NavButton.module.scss';

interface IButton {
  children: JSX.Element | string;
  size: 's' | 'm' | 'l';
  color?: 'blue' | 'dark' | 'secondary' | 'transparent' | 'auction';
  fillStyle: boolean;
  fullWidth?: boolean;
  to: string;
  target?: string;
  className?: string;
  onClick?: () => void;
}

export default function NavButton({
  children,
  color,
  size,
  fillStyle,
  fullWidth,
  to,
  className,
  ...props
}: IButton) {
  const getLinkClassName = (
    color?: string,
    size?: string,
    fillStyle?: boolean,
    fullWidth?: boolean
  ): string => {
    const linkClass: string = classNames(styles.link, className, {
      [styles['link-small']]: size === 's',
      [styles['link-medium']]: size === 'm',
      [styles['link-large']]: size === 'l',
      [styles['link-primary-outlined']]: fillStyle && color === 'blue',
      [styles['link-transparent']]: fillStyle && color === 'transparent',
      [styles['link-dark']]: color === 'dark',
      [styles['link-auction']]: color === 'auction',
      [styles['link-primary']]: !fillStyle && color === 'blue',
      [styles['link-fullWidth']]: fullWidth,
    });
    return linkClass;
  };

  const LinkClassName: string = getLinkClassName(
    color,
    size,
    fillStyle,
    fullWidth
  );

  return (
    <Link href={to} passHref={true}>
      <a className={LinkClassName} {...props}>
        {children}
      </a>
    </Link>
  );
}
