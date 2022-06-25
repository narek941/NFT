import { FC, useEffect, useLayoutEffect, useState } from 'react';
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
import InputWithLabel from '@components/shared/InputWithLabel';
import Button from '@components/shared/Button';
import { useForm } from 'react-hook-form';
import { useIsFieldValid } from '@hooks/useIsFieldValid';
import {
  activateEmailRequest,
  signInRequest,
} from 'src/entities/auth/redux/actions';
import styles from './EmailConfirmation.module.scss';
import ErrorMsgBtm from '@shared/ErrorMsgBtm';
import ModalSubtitle from '@components/shared/ModalSubtitle';
import classNames from 'classnames';
import Container from '@components/shared/Container';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';

interface ISignInForm {
  username: string;
  password: string;
}

const EmailConfirmation: FC = () => {
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);

  const { twoFactorAuthEnabled, userType } = useTypedSelector(
    (state) => state.auth
  );

  const {
    query: { code },
  } = router;

  const authSignData = useTypedSelector((state) => state.auth);
  const { pending, error } = authSignData;
  const dispatch = useDispatch();
  const onSubmit = (data: ISignInForm) => {
    const { username, password } = data;
    dispatch(
      signInRequest({
        email: username,
        password,
      })
    );
    setShowError(true);
  };

  useLayoutEffect(() => {
    if (userType === 'authorized' && twoFactorAuthEnabled) {
      router.replace('/signin/2fa');
      return;
    }
    if (userType === 'authorized') {
      router.replace('/');
      return;
    }
  }, [userType]);

  useEffect(() => {
    if (!code) return;
    if (typeof code === 'object') return;
    dispatch(activateEmailRequest({ code }));
  }, [code]);

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
    mode: 'onChange',
  });

  const handleFocus = () => setShowError(false);

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

  if (pending || !code) return <Spinner />;

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
        <div
          className={classNames(styles.heading, {
            [styles.heading__bottom]: error,
          })}
        >
          {!error
            ? 'Your email was successfully verified'
            : 'The сonfirmation link is expired'}
        </div>
        {error && (
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
              onFocus={handleFocus}
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
              onFocus={handleFocus}
              hasForgotPassword={true}
              error={errors.password ? errors.password : null}
              isValid={isPasswordValid}
              {...register('password')}
            />
            {showError && error && <ErrorMsgBtm errorText={error} />}

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

export default EmailConfirmation;
