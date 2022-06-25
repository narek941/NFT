import React, { ComponentType } from 'react';
import styles from './WithdrawInstallWallet.module.scss';
import Wallet from 'public/other/wallet.svg';
import NavButton from '@shared/NavButton';
import { IModalView } from '../../../../common/models/modal-view';

interface IWithdrawInstallWalletProps {
  setView: (view: IModalView) => void;
}
export const WithdrawInstallWallet: ComponentType<
  IWithdrawInstallWalletProps
> = ({ setView }) => {
  const handleInstallWallet = () => setView(IModalView.redeemInfo);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.media}>
          <Wallet />
        </div>
        <div className={styles.title}>Connect wallet</div>
        <div className={styles.action}>
          <NavButton
            to={'https://metamask.io/download/'}
            target={'_blank'}
            size='m'
            color={'blue'}
            fillStyle={false}
            fullWidth={false}
            onClick={handleInstallWallet}
          >
            Install Metamask
          </NavButton>
        </div>
      </div>
    </>
  );
};
