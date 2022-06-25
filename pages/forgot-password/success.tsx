import Tick from 'public/other/tick.svg';
import ModalWrapper from '@components/ModalWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import NavButton from '@shared/NavButton';
import styles from '@styles/page/forgot-password.module.scss';
import Container from '@components/shared/Container';
import classNames from 'classnames';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';
import btnStyles from '@shared/NavButton/NavButton.module.scss';

function PasswordChanged() {
  return (
    <Container className={styles.container}>
      <ModalWrapper
        className={classNames(styles['success-password'], styles.content)}
      >
        <ModalIconPlaceholder>
          <Tick />
        </ModalIconPlaceholder>
        <ModalTitle
          className={styles['heading-success']}
          text='Password reset successfully'
        />
        <ModalContentWrapper>
          <NavButton
            size={'l'}
            color={'blue'}
            fillStyle={false}
            fullWidth={false}
            to='/signin/step1'
            className={classNames(
              styles.button,
              btnStyles['link-login-primary']
            )}
          >
            {'Go back to login'}
          </NavButton>
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signin-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
}

export default PasswordChanged;
