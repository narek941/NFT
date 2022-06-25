import { useEffect } from 'react';
import Lock from 'public/other/lock.svg';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { wrapper } from 'src/storage/configureStore';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { checkResetCodeRequest } from '@entities/auth/redux/actions';
import ModalWrapper from '@components/ModalWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import ModalSubtitle from '@shared/ModalSubtitle';
import { isServer, jsonParse } from '../../src/common/utils/common';
import { getCookie } from '../../src/common/utils/cookies';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';

import styles from '@styles/page/forgot-password.module.scss';
import Copyright from '@components/copyright';
import PoweredBy from '@components/PoweredBy';
import Container from '@shared/Container';
import classNames from 'classnames';

const CheckEmail = ({ code }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const resetFromCookie = !isServer && jsonParse(getCookie('reset') || '{}');

  const forgotPasswordState = useTypedSelector((state) => state.auth);

  const { error } = forgotPasswordState;

  const emailForRestoring = forgotPasswordState.email;
  const codeFromState = forgotPasswordState.code;

  useEffect(() => {
    if (!code) return;
    if (typeof code === 'object') return;
    if (!resetFromCookie.email) return;
    dispatch(
      checkResetCodeRequest({
        email: resetFromCookie.email,
        code,
      })
    );
  }, [code, emailForRestoring]);

  useEffect(() => {
    if (!codeFromState) return;
    router.push(`/forgot-password/new-password?code=${code}`);
  }, [codeFromState]);

  useNoInitialEffect(() => {
    if (error) {
      router.replace('/forgot-password');
    }
  }, [error]);

  return (
    <Container className={styles.container}>
      <ModalWrapper className={classNames(styles.content, styles.checkEmail)}>
        <ModalIconPlaceholder className={styles['icon-placeholder']}>
          <Lock />
        </ModalIconPlaceholder>
        <ModalTitle
          className={styles['heading-checkEmail']}
          text='Recover Your Password'
        />
        <ModalContentWrapper>
          <ModalSubtitle
            className={styles['subTitle-checkEmail']}
            text={
              error ? (
                error
              ) : (
                <div>
                  <div>If you entered your email address correctly,</div>
                  <div>
                    the password recovery link has been sent to your email
                    successfully.
                  </div>
                </div>
              )
            }
          />
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signin-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (ctx) => {
    return {
      props: {
        code: ctx.query?.code || '',
      },
    };
  }
);

export default CheckEmail;
