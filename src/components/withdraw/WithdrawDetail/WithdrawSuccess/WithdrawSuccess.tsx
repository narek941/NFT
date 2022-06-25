import React, { ComponentType } from 'react';
import styles from './WithdrawSuccess.module.scss';
import WithdrawSuccessIcon from '../../../../../public/other/withdraw_success.svg';
import NavButton from '@shared/NavButton';

interface IWithdrawSuccessWalletProps {}
export const WithdrawSuccess: ComponentType<
  IWithdrawSuccessWalletProps
> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        <WithdrawSuccessIcon />
      </div>
      <div className={styles.title}>Success</div>
      <div className={styles.successText}>NFT transfer is completed!</div>
      <div className={styles.action}>
        <NavButton
          size='m'
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          to={'/settings'}
        >
          Go to Profile
        </NavButton>
      </div>
    </div>
  );
};
