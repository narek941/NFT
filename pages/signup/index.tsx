/* global JSX*/
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import styles from '@styles/page/signup.module.scss';
import btnStyles from '@shared/Button/Button.module.scss';
import React, { useLayoutEffect, useEffect, useState } from 'react';

import {
  passwordRegex,
  PASSWORD_LENGTH_MIN,
  USERNAME_LENGTH_MAX,
  USERNAME_LENGTH_MIN,
  emailRegex,
  PASSWORD_LENGTH_MAX_256,
} from 'configure';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useIsFieldValid } from '@hooks/useIsFieldValid';
import ModalWrapper from '@components/ModalWrapper';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import FormWrapper from '@shared/FormWrapper';
import ErrorMsg from '@shared/ErrorMsg';
import InputWithLabel from '@shared/InputWithLabel';
import CheckBox from '@shared/CheckBox';
import Button from '@shared/Button';
import TipsText from '@components/TipsText';
import {
  clearAuthPending,
  signUpRequest,
} from 'src/entities/auth/redux/actions';
import { Spinner } from '@components/shared/Spinner/Spinner';
import { Text_Digit_Regex } from '@components/Settings/validationSchema';
import PopUpTerms from '@components/PopUpTerms';
import ToggleText from '@components/shared/ToggleText';
import { useAppDispatch } from '@hooks/useAppDispatch';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';
import Container from '@components/shared/Container';

interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
  termsAccepted: boolean;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      Text_Digit_Regex,
      'Username must contain only digits, upper case letters, lower case letters'
    )
    .required('Username is required')
    .trim()
    .min(USERNAME_LENGTH_MIN, 'Username must be at least 3 characters')
    .max(USERNAME_LENGTH_MAX, 'Username must not exceed 128 characters'),
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex as any, 'Email is invalid')
    .email('Not verified Email')
    .trim(),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(PASSWORD_LENGTH_MIN, 'Password must be at least 8 characters')
    .max(PASSWORD_LENGTH_MAX_256, 'Password must not exceed 256 symbols')
    .matches(
      passwordRegex,
      'Password must contain digit, uppercase and lowercase letter'
    ),
  confirmedPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Your passwords are not matching'),
  termsAccepted: Yup.bool().oneOf([true], 'Accept terms is requirred'),
});

function SignUp(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<ISignUpForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { pending, error, userType } = useTypedSelector((state) => state.auth);

  const [showModal, setShowModal] = useState<boolean>(false);

  const usernameVal = watch('username');
  const emailVal = watch('email');
  const passwordVal = watch('password');
  const confirmedPasswordVal = watch('confirmedPassword');

  const isUsernameValid = useIsFieldValid(
    validationSchema,
    'username',
    usernameVal
  );
  const isEmailValid = useIsFieldValid(validationSchema, 'email', emailVal);

  const isPasswordValid = useIsFieldValid(
    validationSchema,
    'password',
    passwordVal
  );

  const isConfirmedPasswordValid =
    confirmedPasswordVal && passwordVal === confirmedPasswordVal;

  useLayoutEffect(() => {
    if (userType === 'authorized') router.replace('/');
  }, [userType]);

  useEffect(() => {
    if (error?.includes('email')) {
      setError('email', {
        type: 'serverError',
        message: error,
      });
    }
    if (error?.includes('Username')) {
      setError('username', {
        type: 'serverError',
        message: error,
      });
    }
  }, [error]);

  const onSubmit = async (data: ISignUpForm) => {
    await dispatch(signUpRequest(data)).unwrap();

    await router.push('/signup/activate');

    dispatch(clearAuthPending());
  };

  if (pending) {
    return <Spinner />;
  }

  const handleAcceptTermsClick = () => {
    setShowModal(!showModal);
  };

  return (
    <Container className={styles.container}>
      <ModalWrapper className={styles.content}>
        <ModalTitle
          className={styles.heading}
          text='Create your Niftables account'
        />
        <ModalContentWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            {error === 'Something went wrong' && <ErrorMsg errorText={error} />}
            <InputWithLabel
              labelText='Username'
              placeholder='username'
              id='username'
              error={errors.username ? errors.username : null}
              isValid={isUsernameValid}
              {...register('username')}
              className={styles.input}
            />
            <InputWithLabel
              labelText='Email'
              placeholder='username@example.com'
              id='email'
              error={errors.email ? errors.email : null}
              isValid={isEmailValid}
              {...register('email')}
              className={styles.input}
            />
            <InputWithLabel
              labelText='Your password'
              placeholder='Enter your password'
              id='password'
              customType='password'
              error={errors.password ? errors.password : null}
              isValid={isPasswordValid}
              {...register('password')}
              className={styles.input}
            />
            <InputWithLabel
              labelText='Confirm your password'
              placeholder='Enter your password'
              id='confirmPassword'
              customType='password'
              error={errors.confirmedPassword ? errors.confirmedPassword : null}
              isValid={!!isConfirmedPasswordValid}
              {...register('confirmedPassword')}
              className={styles.input}
            />
            <div className={styles['checkBox-signup']}>
              <CheckBox
                color='default'
                className={styles.checkBox}
                text={
                  <ToggleText onClick={handleAcceptTermsClick}>
                    Accept terms & conditions
                  </ToggleText>
                }
                error={errors.termsAccepted ? errors.termsAccepted : null}
                {...register('termsAccepted')}
              />
            </div>
            <Button
              disabled={!isValid}
              size='l'
              color='blue'
              fillStyle={false}
              fullWidth={false}
              className={btnStyles['btn-login-primary']}
            >
              Sign Up
            </Button>
            <TipsText
              className={styles.tipsText}
              text='Already a member? '
              linkText='Log in here.'
              linkTo='/signin/step1'
            />
          </FormWrapper>
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signup-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
      <PopUpTerms onClose={handleAcceptTermsClick} isShow={showModal} />
    </Container>
  );
}

export default SignUp;
