import { FC, ReactNode, useRef, useState } from 'react';
import styles from './MenuBar.styles.module.scss';
import classNames from 'classnames';

import IconL from '/public/field-icons/menubar-l.svg';
import IconR from '/public/field-icons/menubar-r.svg';
import ButtonClose from '/public/assets/img/icon-close.svg';
import useOutsideClick from '@hooks/useOutsideClick';
import { useShowHideScroll } from '@hooks/useShowHideScroll';

export interface IMenuBar {
  children: ReactNode | string;
}

export const MenuBar: FC<IMenuBar> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setOpen(false);
    }
  });

  const handleToggle = () => {
    setOpen(!isOpen);
  };
  const handleShow = () => {
    setIsClose(!isClose);
    hideScroll();
    setOpen(true);
  };

  const stopProp = (e) => e.stopPropagation();
  const { showScroll, hideScroll } = useShowHideScroll();

  const onHideWrapper = () => {
    showScroll();
    setIsClose(false);
    setOpen(false);
  };

  return (
    <>
      <div className={styles.navbar} onClick={handleShow}>
        <IconR role={'button'} className={styles['icon-filter']} />
      </div>
      <div
        ref={ref}
        onClick={stopProp}
        className={classNames(styles['menubar'], {
          [styles.collapsed]: !isOpen,
        })}
      >
        <div
          className={classNames(
            styles.headerFilter,
            isOpen && styles['headerFilter-show']
          )}
        >
          <div className={styles['icon-close']} onClick={onHideWrapper}>
            <ButtonClose role={'button'} />
          </div>
          <div className={styles['icon-filter']} onClick={handleToggle}>
            {isOpen ? <IconL role={'button'} /> : <IconR role={'button'} />}
          </div>
          <div
            className={classNames(
              styles['menubar-header'],
              isOpen && styles['menubar-header-show']
            )}
          >
            Filters
          </div>
        </div>
        <div
          className={classNames(
            styles['menubar-wrapper'],
            isOpen && styles['menubar-wrapper-show']
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
