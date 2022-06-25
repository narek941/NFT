/* global JSX*/
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { useTypedSelector } from 'src/hooks/useNewTypedSelector';
import { useIsFieldValid } from '@hooks/useIsFieldValid';
import ModalWrapper from '@components/ModalWrapper';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import FormWrapper from '@shared/FormWrapper';
import InputWithLabel from '@shared/InputWithLabel';
import Button from '@shared/Button';
import { signInRequest } from 'src/entities/auth/redux/actions';
import btnStyles from '@shared/Button/Button.module.scss';
import ErrorMsgBtm from '@shared/ErrorMsgBtm';
import { wrapper } from 'src/storage/configureStore';
import classNames from 'classnames';
import styles from '@styles/page/signIn.module.scss';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';
import Container from '@components/shared/Container';
import { EmailVerificationError } from '@utils/parse-utils';

interface ISignInForm {
  username: string;
  password: string;
}

function Step({ queryError }): JSX.Element {
  const router = useRouter();
  const { twoFactorAuthEnabled, userType } = useTypedSelector(
    (state) => state.auth
  );
  const [showError, setShowError] = useState<boolean>(false);

  const authSignData = useTypedSelector((state) => state.auth);
  const { error } = authSignData;
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

  const handleFocus = () => setShowError(false);

  return (
    <Container
      className={classNames(styles['signIn-wrapper'], styles.container)}
    >
      <ModalWrapper
        className={classNames(styles['signin-step1'], styles.content)}
      >
        <ModalTitle
          className={styles['heading-signIn']}
          text='Sign in with'
          highLightedText='Niftables'
        />
        <ModalContentWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
              className={styles.input}
              labelText='Login'
              placeholder='email/username'
              id='username'
              onFocus={handleFocus}
              error={errors.username ? errors.username : null}
              isValid={isUsernameValid}
              {...register('username')}
            />
            <InputWithLabel
              className={styles.input}
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
            {showError && error && error !== EmailVerificationError && (
              <ErrorMsgBtm errorText={error} />
            )}
            {queryError && !error && (
              <ErrorMsgBtm
                isBigFont
                errorText={'Invalid credentials or 6-digit code'}
              />
            )}
            <Button
              size='l'
              color='blue'
              fillStyle={false}
              fullWidth={false}
              className={classNames(
                btnStyles['btn-login-primary'],
                btnStyles['btn-width-primary']
              )}
            >
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
}
export const getServerSideProps = wrapper.getServerSideProps(
  () => async (ctx) => {
    return {
      props: {
        queryError: ctx.query?.error || '',
      },
    };
  }
);

export default Step;
