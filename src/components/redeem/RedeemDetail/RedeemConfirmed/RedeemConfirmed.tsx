import React, { ComponentType } from 'react';
import styles from './RedeemConfirmed.module.scss';
import Email from '/public/other/email.svg';
import { IMyNFT } from '@type/ntf-token';

interface IRedeemConfirmProps {
  redeem: IMyNFT;
  userEmail?: string;
}
export const RedeemConfirmed: ComponentType<IRedeemConfirmProps> = ({
  userEmail,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        <Email className={styles.icon} />
      </div>
      <div className={styles.title}>Check your mail</div>
      <div className={styles.confirmText}>
        We have sent a notification email to
      </div>
      <div className={styles.confirmEmail}>{userEmail || 'Your email'}</div>
    </div>
  );
};
