import { FC, useEffect, useLayoutEffect } from 'react';
import EmailSuccessfully from 'public/other/email_successfully.svg';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useNewTypedSelector';

import ModalWrapper from '@components/ModalWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalContentWrapper from '@components/ModalContentWrapper';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Spinner } from '@components/shared/Spinner/Spinner';
import FormWrapper from '@components/shared/FormWrapper';
import ErrorMsg from '@components/shared/ErrorMsg';
import InputWithLabel from '@components/shared/InputWithLabel';
import Button from '@components/shared/Button';
import { useForm } from 'react-hook-form';
import { useIsFieldValid } from '@hooks/useIsFieldValid';
import { logOutFrom2FA, signInRequest } from 'src/entities/auth/redux/actions';
import styles from './EmailConfirmation.module.scss';
import ErrorMsgBtm from '@shared/ErrorMsgBtm';
import { activateChangeEmailRequest } from '@entities/user/redux/actions';
import { isServer } from '@utils/common';
import { resetUserState } from '@entities/user/redux/slice';
import { resetAuthState } from '@entities/auth/redux/slice';
import {
  useNoInitialEffect,
  useNoInitialLayoutEffect,
} from '@hooks/useNoInitialEffect';
import classNames from 'classnames';
import Container from '@components/shared/Container';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';
import ModalSubtitle from '@components/shared/ModalSubtitle';

interface ISignInForm {
  username: string;
  password: string;
}

export enum EmailConfirmationMessages {
  SUCCESS = 'Your email was successfully verified',
  LINK_EXPIRED = 'The сonfirmation link is expired',
  CODE_IS_USED = 'The confirmation code is already used',
  WRONG_CODE = 'The confirmation code is not correct',
}

export const EmailChangeConfirmation: FC = () => {
  const router = useRouter();
  const {
    twoFactorAuthEnabled,
    userType,
    token,
    pending: authPending,
    error: authError,
  } = useTypedSelector((state) => state.auth);

  const { pending: userPending, error: userError } = useTypedSelector(
    (state) => state.user
  );

  const {
    query: { code },
    isReady,
  } = router;

  const dispatch = useDispatch();
  const onSubmit = (data: ISignInForm) => {
    const { username, password } = data;
    dispatch(
      signInRequest({
        email: username,
        password,
      })
    );
  };

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!code || typeof code === 'object') {
      // user comes to the page by mistake, cannot make the request
      router.replace('/');
      return;
    }
    if (userType === 'authorized') {
      // force logout to prevent using one account and change email for another
      dispatch(logOutFrom2FA());
      dispatch(resetUserState());
      dispatch(resetAuthState());
    }
    dispatch(activateChangeEmailRequest({ code }));
  }, [isReady]);

  useNoInitialLayoutEffect(() => {
    if (!token) {
      return;
    }
    // user fill login form and need to be leaded from email confirmation change page
    const nextPage = twoFactorAuthEnabled ? '/signin/2fa' : '/';
    router.replace(nextPage);
  }, [token]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignInForm>({
    resolver: yupResolver(validationSchema),
  });

  const usernameValue = watch('username');
  const passwordValue = watch('password');

  const isUsernameValid = useIsFieldValid(
    validationSchema,
    'username',
    usernameValue
  );

  const isPasswordValid = useIsFieldValid(
    validationSchema,
    'password',
    passwordValue
  );

  const generateMessage = (): string => {
    switch (userError) {
      case null:
        return EmailConfirmationMessages.SUCCESS;
      case 'CODE_EXPIRED':
        return EmailConfirmationMessages.LINK_EXPIRED;
      case 'CODE_USED':
        return EmailConfirmationMessages.CODE_IS_USED;
      default:
        return EmailConfirmationMessages.WRONG_CODE;
    }
  };

  if (authPending || userPending || !code) return <Spinner />;

  return (
    <Container
      className={classNames(styles['signIn-wrapper'], styles.container)}
    >
      <ModalWrapper
        className={classNames(styles['signIn-content'], styles.content)}
      >
        <ModalIconPlaceholder>
          <EmailSuccessfully />
        </ModalIconPlaceholder>
        {/* <div className={styles.heading}>{confirmText}</div> */}
        <div
          className={classNames(styles.heading, {
            [styles.heading__bottom]: userError,
          })}
        >
          {generateMessage()}
        </div>
        {userError && (
          <ModalSubtitle
            style='bold'
            className='mb-20'
            text='Please log in to your account and resend confirmation email.'
          />
        )}
        <ModalContentWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
              className={styles.labelWrapper}
              labelText='Login'
              placeholder='email/username'
              id='username'
              error={errors.username ? errors.username : null}
              isValid={isUsernameValid}
              {...register('username')}
            />
            <InputWithLabel
              className={styles.labelWrapper}
              labelText='Your Password'
              placeholder='Enter your password'
              id='password'
              customType='password'
              hasForgotPassword={true}
              error={errors.password ? errors.password : null}
              isValid={isPasswordValid}
              {...register('password')}
            />
            {authError && <ErrorMsgBtm errorText={authError} />}
            <Button size='l' color='blue' fillStyle={false} fullWidth={false}>
              Sign in
            </Button>
          </FormWrapper>
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signin-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
};
