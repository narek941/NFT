import { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import classNames from 'classnames';
import styles from './NavTabs.module.scss';
import Link from '@components/shared/Link';
export interface INavTabItem {
  id: number;
  name: string;
  linkTo: string;
  content: ReactElement;
}

export interface INavTabsProps {
  tabs: INavTabItem[];
  gap?: string;
  pills?: boolean;
  activeTab: string | number;
  className?: string;
  setActiveTab: Dispatch<SetStateAction<string | number>>;
}

export const NavTabs: FC<INavTabsProps> = ({
  tabs,
  gap,
  pills,
  activeTab,
  setActiveTab,
  className,
  ...props
}) => {
  const getNavClassName = (pills?: boolean, gap?: string): string => {
    const btnClass: string = classNames(
      className,
      styles.nav,
      { [styles['nav-pills']]: pills },
      { [styles['gap-large']]: gap === 'l' },
      { [styles['gap-small']]: gap === 's' }
    );
    return btnClass;
  };

  const navClassName: string = getNavClassName(pills, gap);

  return (
    <div className={classNames(styles.wrapper)}>
      <ul className={navClassName} {...props}>
        {tabs.map((navItem) => {
          const { linkTo, id, name } = navItem;
          return (
            <li className={styles.navItem} key={id}>
              <Link
                shallow={true}
                className={classNames([
                  styles.navLink,
                  activeTab === id && styles.isActive,
                ])}
                // href={`?tab=[${linkTo}]`}
                href={'?tab=[pid]'}
                as={`?tab=${linkTo}`}
                isActive={activeTab === id}
                setActive={setActiveTab}
                id={id}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles['tab-content-wrapper']}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
