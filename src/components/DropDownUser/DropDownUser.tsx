import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './DropDownUser.module.scss';
import useDropDown from '@shared/DropDown/useDropDown';
import Icon from '/public/other/arrowDown.svg';
import { IDropDown } from '@type/general';

import Logout from 'public/other/logout.svg';
import DropDownLink from '@shared/DropDown/DropDownLink';
import SubMenu from '@shared/SubMenu';

const DropDownUser: FC<IDropDown> = ({
  options,
  right,
  icon,
  userText,
  isLoading,
  logoutHandler,
}) => {
  const { ref, switchShow, show } = useDropDown();

  const handleToggle = () => switchShow(!show);

  const defaultText = <div>{userText || 'Example...'}</div>;
  return (
    <div className={styles.dropDownWrapper}>
      <div
        className={classNames([styles.dropDownHeader, show && styles.show])}
        onClick={handleToggle}
      >
        {defaultText}

        {icon && <Icon className={styles['icon-arrow']} />}
      </div>
      <div
        className={classNames([
          styles.dropDownList,
          show && styles.show,
          right && styles['dropDown-right'],
        ])}
        ref={ref}
      >
        {options.length ? (
          <>
            <div className={styles.scrollingWrapper}>
              {options.map((option, index) => {
                const dataSubmenu = option.submenu?.map((items, id) => {
                  return (
                    <DropDownLink
                      key={`subLink_${id}`}
                      items={items}
                      onClick={items.onClick ?? handleToggle}
                    />
                  );
                });
                return (
                  <>
                    {option.submenu ? (
                      <>
                        <SubMenu
                          key={`submenu_${index}`}
                          name={option.name}
                          id={option.id}
                          submenu={dataSubmenu}
                          onClick={option.onClick}
                        />
                      </>
                    ) : (
                      <DropDownLink
                        key={`link_${index}`}
                        items={option}
                        onClick={handleToggle}
                      />
                    )}
                  </>
                );
              })}
              <div className={styles.link} onClick={logoutHandler}>
                <Logout width='18' height='18' /> Logout
              </div>
            </div>
          </>
        ) : (
          <>{isLoading && <div>Loader</div>}</>
        )}
      </div>
    </div>
  );
};

export default DropDownUser;
