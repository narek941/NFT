/* global JSX*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import OTPBlock from '@components/OTPBlock';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import {
  clearLoginFlow,
  twoFASignInRequest,
} from '@entities/auth/redux/actions';
import { parseJwt } from 'src/common/utils/jwt';
import { userInfoRequest } from '@entities/user/redux/actions';
import Container from '@components/shared/Container';
import styles from '@styles/page/signIn.module.scss';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';

function TwoFa(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, error: twoFAError } = useTypedSelector((state) => state.auth);
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      const jwt = parseJwt(token);
      if (jwt.twoFactorPassed) {
        router.push('/');
      }
    }
  }, [token]);

  useEffect(() => {
    if (token && !user?.profile) {
      dispatch(userInfoRequest({}));
    }
  }, [token, user?.id]);

  useEffect(() => {
    if (twoFAError) {
      const fetchData = async () => {
        await dispatch(clearLoginFlow());
        router.push('/signin');
        setOtp('');
      };
      fetchData();
    }
  }, [twoFAError]);

  const [error, setError] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  function otpHandler(newOtp: string): void {
    if (newOtp !== otp) {
      setError('');
      setOtp(newOtp);
    }
  }

  function btnClickHandler() {
    dispatch(twoFASignInRequest({ otp }));
  }

  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <OTPBlock
          user={user}
          error={error}
          otpHandler={otpHandler}
          btnClickHandler={btnClickHandler}
        />
      </div>
      <div className={styles['signin-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
}

export default TwoFa;
