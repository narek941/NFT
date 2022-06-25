/* global JSX*/
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Lock from 'public/other/lock.svg';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { resetPasswordRequest } from '@entities/auth/redux/actions';
import { useIsFieldValid } from '@hooks/useIsFieldValid';
import ModalWrapper from '@components/ModalWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import FormWrapper from '@shared/FormWrapper';
import InputWithLabel from '@shared/InputWithLabel';
import Button from '@shared/Button';
import TipsText from '@components/TipsText';
import { Spinner } from '@components/shared/Spinner/Spinner';
import ModalSubtitle from '@components/shared/ModalSubtitle';
import btnStyles from '@shared/Button/Button.module.scss';
import classNames from 'classnames';
import styles from '@styles/page/forgot-password.module.scss';
import Container from '@shared/Container';
import PoweredBy from '@components/PoweredBy';
import Copyright from '@components/copyright';

interface IForgotPasswordForm {
  emailForRestoring: string;
}

function ForgotPassword(): JSX.Element {
  const validationSchema = Yup.object().shape({
    emailForRestoring: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });

  const router = useRouter();

  const dispatch = useDispatch();

  const loading = useTypedSelector((state) => state.auth.pending);
  const error = useTypedSelector((state) => state.auth.error);
  const errorClass = classNames({ ['heading-expired']: error });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForgotPasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: IForgotPasswordForm) => {
    dispatch(resetPasswordRequest({ email: data.emailForRestoring }));
    router.push('/forgot-password/check-email');
  };

  const emailVal = watch('emailForRestoring');
  const isEmailValid = useIsFieldValid(
    validationSchema,
    'emailForRestoring',
    emailVal
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className={styles.container}>
      <ModalWrapper
        className={classNames(styles['forgot-password'], styles.content)}
      >
        <ModalIconPlaceholder className={styles['icon-placeholder']}>
          <Lock />
        </ModalIconPlaceholder>
        <ModalTitle
          className={classNames(styles.heading, styles[errorClass])}
          text={
            !error
              ? 'Recover Your Password'
              : 'The password recovery link is expired'
          }
        />
        {error && (
          <ModalSubtitle
            style='bold'
            className={'mb-20'}
            text='Please enter your email and request a new recovery link.'
          />
        )}
        <ModalContentWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
              labelText='Email'
              placeholder='username@gmail.com'
              id='restoreEmail'
              error={errors.emailForRestoring ? errors.emailForRestoring : null}
              isValid={isEmailValid}
              {...register('emailForRestoring')}
            />
            <Button
              size='m'
              color='blue'
              fillStyle={false}
              fullWidth={false}
              className={classNames(
                styles.button,
                btnStyles['btn-login-primary']
              )}
            >
              Send recovery link
            </Button>
          </FormWrapper>
          <TipsText
            className={styles.tipsText}
            text='Go Back to'
            linkText='Login'
            linkTo='/signin/step1'
          />
        </ModalContentWrapper>
      </ModalWrapper>
      <div className={styles['signin-bottom']}>
        <PoweredBy className={styles.poweredBy} />
        <Copyright />
      </div>
    </Container>
  );
}

export default ForgotPassword;
