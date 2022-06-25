import React, { ComponentType, useEffect } from 'react';
import styles from './WithdrawConnectWallet.module.scss';
import btnStyles from '@components/shared/Button/Button.module.scss';
import Wallet from 'public/other/wallet.svg';
import Button from '@shared/Button';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { Spinner } from '@shared/Spinner';
import { metamaskAnimationScript } from '../../../../common/assets/metamask-animation-script';
import { IModalView } from '../../../../common/models/modal-view';
import { IMyNFT } from '@type/ntf-token';
import { toast } from 'react-toastify';

interface IWithdrawConnectWalletProps {
  item: IMyNFT;
  setView: (view: IModalView) => void;
  getMetamaskAccounts: any;
  metamaskAccountChange: any;
}

export const WithdrawConnectWallet: ComponentType<
  IWithdrawConnectWalletProps
> = ({ item, getMetamaskAccounts, metamaskAccountChange, setView }) => {
  const { error, pending, metamaskAddress } = useTypedSelector(
    (state) => state.user
  );

  useNoInitialEffect(() => {
    if (!pending && !error && metamaskAddress) {
      setView(IModalView.withdrawInfo);
    }
  }, [pending, error, metamaskAddress]);

  useEffect(() => {
    //temporary
    const script = document.createElement('script');
    if (!script.text) {
      script.text = metamaskAnimationScript;
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
    //temporary
  }, [item.id]);
  const handleConnect = async () => {
    const metaMaskAccount = await getMetamaskAccounts();
    const changed = await metamaskAccountChange(metaMaskAccount);
    if (changed.type === 'user/metaMaskSend/rejected') {
      toast.error('This metamask address is already is being used');
      return false;
    }
    _viewConfirmWindow();
  };

  const _viewConfirmWindow = () => {
    setView(IModalView.withdrawConfirm);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.media}>
          <Wallet className={styles['icon-wallet']} />
        </div>
        <div className={styles.title}>Connect wallet</div>
        <div className={styles.action}>
          <Button
            size='s'
            className={btnStyles['btn-connect']}
            onClick={handleConnect}
          >
            <div id={'logo-container'} className={styles.logoContainer}>
              Connect
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
