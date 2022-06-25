import React from 'react';
import Button from '@components/shared/Button';
import Input from '@components/shared/Input';
import FormWrapper from '@components/shared/FormWrapper';
import styles from './SubscribeForm.module.scss';

const SubscribeForm = ({
  onSubmit,
  errors,
  register,
  name,
  isValid,
  messageSuccess,
}) => {
  return (
    <FormWrapper onSubmit={onSubmit} className={styles['form-subscribe']}>
      <div className={styles['form-group']}>
        <Input
          id='emailForSubscribe'
          placeholder='Enter your email'
          size='l'
          className={styles.input}
          error={errors}
          {...register(name)}
          isValid={isValid}
        />
        <Button
          className={styles.button}
          color='blue'
          size='m'
          onClick={onSubmit}
        >
          Subscribe
        </Button>
      </div>
      {isValid && <div className={styles.success}>{messageSuccess}</div>}
    </FormWrapper>
  );
};

export default SubscribeForm;
