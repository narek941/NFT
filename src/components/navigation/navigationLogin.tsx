import { navigationList } from 'configure';
import { NavItem } from '@components/NavItem';
import { menuHeader } from 'configure';
import styles from './navigation.module.scss';
import Avatar from '@components/shared/Avatar';
import DropDownUser from '@components/DropDownUser';
import NavItemWrapper from '@components/NavItemWrapper';

export function NavigationLogin() {
  const imgSrc = '/other/user.svg';

  const user = (
    <Avatar imgSrc={imgSrc} width={48} height={48} size='s' color='primary' />
  );
  const getOptions = (options) =>
    options.map((item, index) => ({
      id: index,
      linkTo: item.linkTo,
      name: (
        <>
          <item.icon className={styles['icon-svg']} width='18' height='18' />
          {item.name}
        </>
      ),
      submenu: item.submenu,
    }));

  const logoutHandler = () => {
    console.log('logoutHandler');
  };
  return (
    <>
      <nav>
        <ul className={styles.navUl}>
          {navigationList.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
          <NavItemWrapper>{''}</NavItemWrapper>
        </ul>
      </nav>
      <DropDownUser
        right={true}
        userText={user}
        showSearch={true}
        options={getOptions(menuHeader)}
        logoutHandler={logoutHandler}
      />
    </>
  );
}
