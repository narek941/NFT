import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Lock from 'public/other/lock.svg';

import {
  passwordRegex,
  PASSWORD_LENGTH_MIN,
  PASSWORD_LENGTH_MAX_256,
} from 'configure';
import { useLayoutEffect } from 'react';
import { wrapper } from 'src/storage/configureStore';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import {
  clearAuthPending,
  setNewPasswordRequest,
} from '@entities/auth/redux/actions';
import { useIsFieldValid } from '@hooks/useIsFieldValid';
import ModalWrapper from '@components/ModalWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import FormWrapper from '@shared/FormWrapper';
import InputWithLabel from '@shared/InputWithLabel';
import Button from '@shared/Button';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { isServer, jsonParse } from '@utils/common';
import { getCookie } from '@utils/cookies';
import styles from '@styles/page/forgot-password.module.scss';

import classNames from 'classnames';
import btnStyles from '@shared/Button/Button.module.scss';
import Container from '@shared/Container';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';

interface INewPasswordForm {
  password: string;
  confirmPassword: string;
}

const NewPassword = ({ queryCode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const resetFromCookie = !isServer && jsonParse(getCookie('reset') || '{}');
  const forgotPasswordState = useTypedSelector((state) => state.auth);
  const emailForRestoring = forgotPasswordState?.email || resetFromCookie.email;
  const code = forgotPasswordState?.code || queryCode;
  const error = forgotPasswordState?.error;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(PASSWORD_LENGTH_MIN, 'Password must be at least 8 characters')
      .max(PASSWORD_LENGTH_MAX_256, 'Password must not exceed 256 symbols')

      .matches(
        passwordRegex,
        'Password must contain digit, uppercase and lowercase letter'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Your passwords are not matching'),
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<INewPasswordForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useLayoutEffect(() => {
    if (!emailForRestoring && !code) router.replace('/forgot-password');
    if (emailForRestoring && !code)
      router.replace('/forgot-password/check-email');
  }, []);

  const passwordVal = watch('password');
  const confirmPasswordVal = watch('confirmPassword');

  const isPasswordValid = useIsFieldValid(
    validationSchema,
    'password',
    passwordVal
  );
  const isConfirmPasswordValid =
    confirmPasswordVal && confirmPasswordVal === passwordVal;

  const onSubmit = async (data: INewPasswordForm) => {
    if (!emailForRestoring) return;

    await dispatch(
      setNewPasswordRequest({
        email: emailForRestoring,
        code: code as string,
        password: data.password,
      })
    ).unwrap();

    await router.push('/forgot-password/success');

    dispatch(clearAuthPending());
  };

  useLayoutEffect(() => {
    if (error) {
      setError('password', {
        type: 'serverError',
        message:
          error == 'NEW_PASSWORD_MATCHES_CURRENT'
            ? 'New password should be different from the previous one'
            : error,
      });
    }
  }, [error]);

  return (
    <Container className={styles.container}>
      <ModalWrapper
        className={classNames(styles['new-password'], styles.content)}
      >
        <ModalIconPlaceholder className={styles['icon-placeholder']}>
          <Lock />
        </ModalIconPlaceholder>
        <ModalTitle className={styles.heading} text='Recover Your Password' />
        <ModalContentWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
              labelText='Your password'
              placeholder='Enter your password'
              id='password'
              customType='password'
              error={errors.password ? errors.password : null}
              isValid={isPasswordValid}
              {...register('password')}
            />
            <InputWithLabel
              labelText='Confirm your password'
              placeholder='Enter your password'
              id='confirmPassword'
              customType='password'
              error={errors.confirmPassword ? errors.confirmPassword : null}
              isValid={isConfirmPasswordValid ? true : false}
              {...register('confirmPassword')}
            />
            <Button
              size='l'
              color='blue'
              fillStyle={false}
              fullWidth={false}
              className={classNames(
                styles.button,
                btnStyles['btn-login-primary']
              )}
            >
              Reset password
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (ctx) => {
    return {
      props: {
        queryCode: ctx.query.code,
      },
    };
  }
);

export default NewPassword;
