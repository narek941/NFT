import React, { useState } from 'react';
import classNames from 'classnames';
import styles from '@shared/DropDown/DropDown.module.scss';

import Arrow from '/public/other/arrowDown.svg';
import { IDropDownItem } from '@type/general';

const SubMenu = ({ name, submenu }: IDropDownItem) => {
  const [toggleSubMenu, setToggleSubMenu] = useState<boolean>(false);
  const onToggle = () => {
    setToggleSubMenu(!toggleSubMenu);
  };

  return (
    <>
      <div
        className={classNames([
          styles.isSubmenu,

          toggleSubMenu ? styles.isActive : '',
        ])}
      >
        <div className={styles.link} onClick={onToggle}>
          {name}
          <Arrow className={styles['icon-arrow']} width='10' height='6' />
        </div>
        <div className={styles.subMenu}>{submenu}</div>
      </div>
    </>
  );
};

export default SubMenu;
