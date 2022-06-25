import React, { ComponentType } from 'react';
import { INFT, INFTDetail } from '@type/nft';
import { RedeemConfirm } from '@components/redeem/RedeemDetail/RedeemConfirm';
import { RedeemConfirmed } from '@components/redeem/RedeemDetail/RedeemConfirmed';
import { RedeemInfo } from '@components/redeem/RedeemDetail/RedeemInfo';
import { WithdrawSuccess } from '@components/withdraw/WithdrawDetail/WithdrawSuccess';
import { WithdrawInstallWallet } from '@components/withdraw/WithdrawDetail/WithdrawInstallWallet';
import { WithdrawConnectWallet } from '@components/withdraw/WithdrawDetail/WithdrawConnectWallet';
import { IModalView } from '../../../common/models/modal-view';
import { useMetamask } from '@hooks/useMetamask';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { Spinner } from '@shared/Spinner';
import { IMyNFT } from '@type/ntf-token';

interface IRedeemDetailProps {
  item: IMyNFT;
  onRedeem: (redeem: IMyNFT) => void;
  onActivate: (redeem: IMyNFT) => void;
  onWithdraw: (redeem: IMyNFT) => void;
  userEmail?: string;
  viewDetail: IModalView;
  setView: (view: IModalView) => void;
}

export const RedeemDetail: ComponentType<IRedeemDetailProps> = ({
  item,
  onRedeem,
  onActivate,
  onWithdraw,
  userEmail,
  viewDetail = IModalView.redeemInfo,
  setView,
}) => {
  const { pending } = useTypedSelector((state) => state.nft);

  const {
    getMetamaskAddress,
    metamaskInstalled,
    getMetamaskAccounts,
    metamaskAccountChange,
  } = useMetamask();

  const handleWithdraw = (withdraw: IMyNFT) => {
    console.log('handleWithdraw');
    if (getMetamaskAddress() && metamaskInstalled()) {
      if (withdraw && withdraw.utilityStatus == 'ACTIVATABLE') {
        onWithdraw && onWithdraw(withdraw);
      }
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
      <Spinner isLoading={pending} />
      {viewDetail === IModalView.redeemInfo && (
        <RedeemInfo
          handleWithdraw={handleWithdraw}
          token={item}
          setView={setView}
        />
      )}

      {viewDetail === IModalView.redeemConfirm && (
        <RedeemConfirm
          onConfirm={() => setView(IModalView.redeemConfirmed)}
          onActivate={onActivate}
          onRedeem={onRedeem}
          redeem={item}
        />
      )}
      {viewDetail === IModalView.redeemConfirmed && (
        <RedeemConfirmed userEmail={userEmail} redeem={item} />
      )}

      {viewDetail === IModalView.withdrawSuccess && <WithdrawSuccess />}

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
    </>
  );
};
