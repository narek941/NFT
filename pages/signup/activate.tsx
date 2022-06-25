/* global JSX*/
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { useEffect, useLayoutEffect, useState } from 'react';
import ModalWrapper from '@components/ModalWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import ModalSubtitle from '@shared/ModalSubtitle';
import Letter from 'public/other/letter.svg';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import {
  resendEmailRequest,
  activateEmailRequest,
  toggleShowActivateNotification,
} from '@entities/auth/redux/actions';
import { Spinner } from '@components/shared/Spinner/Spinner';
import Button from '@components/shared/Button';
import ResendMinuteTimer from '@components/ResendMinuteTimer';
import Container from '@components/shared/Container';
import styles from '@styles/page/signup.module.scss';
import btnStyles from '@shared/Button/Button.module.scss';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';
import { EmailVerificationError } from '@utils/parse-utils';

function SignUpSuccess(): JSX.Element {
  const router = useRouter();

  const [showTimer, setshowTimer] = useState<boolean>(false);
  const authSignUpData = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    isReady,
    query: { code, email: activeEmail },
  } = router;

  const { userType, email, pending, error, showActivateNotification } =
    authSignUpData;

  const providedEmail = (activeEmail || email) as string;

  const TWO_MIN_IN_MS = 2 * 60 * 1000;
  const dateTime = new Date().getTime() + TWO_MIN_IN_MS;

  useEffect(() => {
    showActivateNotification && dispatch(toggleShowActivateNotification());
  }, []);

  useLayoutEffect(() => {
    if (userType === 'authorized') router.replace('/');
  }, [userType]);

  useLayoutEffect(() => {
    if (isReady && !providedEmail) {
      router.replace('/');
    }
  }, [providedEmail]);

  useEffect(() => {
    if (!code) return;
    if (typeof code === 'object') return;
    dispatch(activateEmailRequest({ code }));
  }, [code]);

  const handleResend = () => {
    if (error === EmailVerificationError || !error) {
      dispatch(resendEmailRequest({ email: providedEmail }));
      setshowTimer(true);
    }
  };

  const timerToggle = () => {
    setshowTimer(!showTimer);
  };

  if (pending) return <Spinner />;

  return (
    <Container className={styles.container}>
      <ModalWrapper className={styles.content}>
        <ModalIconPlaceholder className={styles['icon-placeholder']}>
          <Letter />
        </ModalIconPlaceholder>
        <ModalTitle
          className={styles['heading-signUp-active']}
          text='Check your mail'
        />
        <ModalContentWrapper>
          <ModalSubtitle
            className={styles['subtitle-signUp-active']}
            text={
              error && error !== EmailVerificationError
                ? error
                : 'We have sent a confirmation email to'
            }
          />
          <ModalSubtitle
            text={providedEmail ? providedEmail : 'example@gmail.com'}
            style='bold'
          />
          {!showTimer ? (
            <Button
              size='s'
              color='blue'
              fillStyle={true}
              fullWidth={false}
              onClick={handleResend}
              className={btnStyles['btn-login-primary']}
            >
              Resend email
            </Button>
          ) : (
            <ResendMinuteTimer
              timerToggle={timerToggle}
              targetDate={dateTime}
            />
          )}
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signup-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
}

export default SignUpSuccess;
