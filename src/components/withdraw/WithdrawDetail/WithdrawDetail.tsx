import React, { ComponentType } from 'react';
import { WithdrawInfo } from '@components/withdraw/WithdrawDetail/WithdrawInfo';
import { WithdrawInstallWallet } from '@components/withdraw/WithdrawDetail/WithdrawInstallWallet';
import { WithdrawConnectWallet } from '@components/withdraw/WithdrawDetail/WithdrawConnectWallet';
import { WithdrawSuccess } from '@components/withdraw/WithdrawDetail/WithdrawSuccess';
import { useMetamask } from '@hooks/useMetamask';
import { Spinner } from '@shared/Spinner';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { IModalView } from '../../../common/models/modal-view';
import { IMyNFT } from '@type/ntf-token';
import { WithdrawConfirm } from '@components/withdraw/WithdrawDetail/WithdrawConfirm';
import { IUser } from '../../../common/models/user';

interface IWithdrawDetailProps {
  item: any;
  viewDetail: IModalView;
  onWithdraw: (redeem: IMyNFT) => void;
  setView: (view: IModalView) => void;
}

export const WithdrawDetail: ComponentType<IWithdrawDetailProps> = ({
  item,
  viewDetail = IModalView.withdrawInstallWallet,
  onWithdraw,
  setView,
}) => {
  const {
    getMetamaskAddress,
    metamaskInstalled,
    getMetamaskAccounts,
    metamaskAccountChange,
  } = useMetamask();
  const { pending } = useTypedSelector((state) => state.nft);
  const { pending: userPending } = useTypedSelector((state) => state.user);
  const handleWithdraw = (withdraw: IMyNFT) => {
    if (getMetamaskAddress() && metamaskInstalled()) {
      setView(IModalView.withdrawConfirm);
    }

    if (!metamaskInstalled()) {
      setView(IModalView.withdrawInstallWallet);
    }

    if (metamaskInstalled() && !getMetamaskAddress()) {
      setView(IModalView.withdrawConnectWallet);
    }
  };

  return (
    <>
      <Spinner isLoading={pending || userPending} />
      {viewDetail === IModalView.withdrawInfo && (
        <WithdrawInfo
          handleWithdraw={handleWithdraw}
          item={item}
          setView={setView}
        />
      )}

      {viewDetail === IModalView.withdrawConfirm && (
        <WithdrawConfirm
          item={item}
          onWithdraw={onWithdraw}
          setView={setView}
        />
      )}

      {viewDetail === IModalView.withdrawInstallWallet && (
        <WithdrawInstallWallet setView={setView} />
      )}

      {viewDetail === IModalView.withdrawConnectWallet && (
        <WithdrawConnectWallet
          getMetamaskAccounts={getMetamaskAccounts}
          metamaskAccountChange={metamaskAccountChange}
          item={item}
          setView={setView}
        />
      )}

      {viewDetail === IModalView.withdrawSuccess && <WithdrawSuccess />}
    </>
  );
};
