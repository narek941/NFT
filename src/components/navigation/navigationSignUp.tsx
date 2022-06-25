import { navigationList } from 'configure';
import { NavItem } from '@components/NavItem';
import NavItemWrapper from '@components/NavItemWrapper';
import NavButton from '@shared/NavButton';
import styles from './navigation.module.scss';

export const NavigationSignUp = () => {
  return (
    <>
      <nav>
        <ul className={styles.navUl}>
          {navigationList.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
          <NavItemWrapper>
            <NavButton
              size='m'
              color='blue'
              fillStyle={true}
              fullWidth={false}
              to='/signin'
            >
              Sign in
            </NavButton>
          </NavItemWrapper>
        </ul>
      </nav>
    </>
  );
};
