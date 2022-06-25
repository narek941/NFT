/* global JSX*/
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import ModalWrapper from '@components/ModalWrapper';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import ModalSubtitle from '@shared/ModalSubtitle';
import NavButton from '@shared/NavButton';
import TipsText from '@components/TipsText';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import Container from '@components/shared/Container';
import btnStyles from '@shared/NavButton/NavButton.module.scss';
import { clearAuthError } from '@entities/auth/redux/actions';
import classNames from 'classnames';
import styles from '@styles/page/signIn.module.scss';
import Copyright from '@components/copyright';
import PoweredBy from '@components/PoweredBy';

function SignIp(): JSX.Element {
  const dispatch = useDispatch();

  const { userType, error } = useTypedSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      dispatch(clearAuthError());
    }
  }, []);

  useLayoutEffect(() => {
    if (userType === 'authorized') router.replace('/');
  }, [userType]);

  return (
    <Container
      className={classNames(styles['signIn-wrapper'], styles.container)}
    >
      <ModalWrapper
        className={classNames(styles['signIn-content'], styles.content)}
      >
        <ModalTitle
          className={styles.heading}
          text='Sign in with'
          highLightedText='Niftables'
        />

        <ModalContentWrapper>
          <ModalSubtitle
            className={styles.subHeading}
            style={'bold'}
            text='Use your Niftables account for all of our white label platforms.'
          />
          <NavButton
            to='signin/step1'
            color='blue'
            size='l'
            fillStyle={false}
            className={classNames(
              btnStyles['link-login-primary'],
              styles.button,
              btnStyles['link-width-login']
            )}
          >
            Sign in with Niftables
          </NavButton>
          <NavButton
            to='signup'
            color='blue'
            size='l'
            fillStyle={true}
            className={classNames(
              btnStyles['link-login-secondary'],
              btnStyles['link-width-login'],
              styles.button
            )}
          >
            <span>Create Niftables account</span>
          </NavButton>
          <TipsText linkText='What is Niftables?' linkTo='/about' />
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signin-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
}

export default SignIp;
