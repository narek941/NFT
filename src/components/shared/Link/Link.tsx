import { CustomLinkProps } from '@type/general';
import classNames from 'classnames';
import NextLink from 'next/link';

import { FC } from 'react';

import styles from './Link.module.scss';

const Link: FC<CustomLinkProps> = ({
  className,
  children,
  href,
  isActive,
  setActive,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  target,
  id,
  as,
  ...anchorProps
}) => {
  const handleClick = (e) => {
    setActive(id);

    if ((href as string).startsWith('#')) {
      e.preventDefault();

      const idEl = href.toString().split('#');
      const getAttrId = document.getElementById(idEl[1]);

      if (!getAttrId) {
        return;
      }

      const getPositionTop =
        getAttrId!.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        behavior: 'smooth',
        top: getPositionTop,
      });
    }
  };

  const LinkClass: string = classNames([
    styles['navLink'],
    className,
    isActive && styles.isActive,
  ]);
  return (
    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <a
        tabIndex={0}
        role='link'
        onClick={handleClick}
        onKeyDown={handleClick}
        {...anchorProps}
        className={LinkClass}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
