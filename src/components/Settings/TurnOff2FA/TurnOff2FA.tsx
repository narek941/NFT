import React from 'react';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import IconEncryption from 'public/other/encryption.svg';

import Input from '@components/shared/Input';
import Button from '@components/shared/Button';
import styles from './TurnOff2FA.module.scss';

const TurnOff2FA = ({ onClick, register }) => {
  return (
    <div className={styles.wrapper}>
      <ModalIconPlaceholder>
        <IconEncryption />
      </ModalIconPlaceholder>
      <div className={styles.content}>
        <div className={styles.heading}>
          Turn off two-factor authentication?
        </div>
        <p>
          {`Turning off 2FA will remove the extra security on your account, and
          you'll only use your password to sign in.`}
        </p>
      </div>
      <Input
        id={'newPasswordTurnOff2FA'}
        name={'newPasswordTurnOff2FA'}
        placeholder='Enter your password'
        customType='password'
        {...register('newPasswordTurnOff2FA')}
      />
      <Button onClick={onClick} size='l' color='blue'>
        Turn off 2FA
      </Button>
    </div>
  );
};

export default TurnOff2FA;
