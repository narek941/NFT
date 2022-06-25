import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

import { useTypedSelector } from '@hooks/useNewTypedSelector';
import styles from './DropDown.module.scss';

const DropDownLink = ({ items, onClick }) => {
  const router = useRouter();
  const { linkTo, name, restrictId } = items;
  const navigationConfig = useTypedSelector(
    (state) => state.configuration.navigationConfig
  );

  if (restrictId && !navigationConfig[restrictId]) return null;

  return (
    <>
      <Link href={`${linkTo}`}>
        <a
          onClick={onClick}
          className={classNames(
            styles.link,
            `${router?.pathname == linkTo ? styles.isActive : ''}`
          )}
        >
          {name}
        </a>
      </Link>
    </>
  );
};

export default DropDownLink;
