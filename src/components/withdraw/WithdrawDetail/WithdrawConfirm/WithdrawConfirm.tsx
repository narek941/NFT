import React, { ComponentType } from 'react';
import styles from './WithdrawConfirm.module.scss';
import WithdrawIcon from '../../../../../public/other/withdraw.svg';
import Button from '@shared/Button';
import { IAddress } from '../../../../common/models/user';
import Badge from '@shared/Badge';
import { IModalView } from '../../../../common/models/modal-view';
import { IMyNFT } from '@type/ntf-token';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useMetamask } from '@hooks/useMetamask';

interface IWithdrawConfirmProps {
  setView: (view: IModalView) => void;
  onWithdraw: (redeem: IMyNFT) => void;
  item: IMyNFT;
}
export const WithdrawConfirm: ComponentType<IWithdrawConfirmProps> = ({
  setView,
  onWithdraw,
  item,
}) => {
  const { getMetamaskAddress } = useMetamask();
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        <WithdrawIcon />
      </div>
      <div className={styles.title}>Withdraw an NFT</div>
      <div className={styles.successText}>
        You are about to withdraw an NFT to the wallet
        {getMetamaskAddress() && (
          <Badge rounded color='primary' size='s' className={styles.sBadge}>
            {`${getMetamaskAddress()?.substring(
              0,
              5
            )}...${getMetamaskAddress()?.slice(-4)}` || '...'}
          </Badge>
        )}
      </div>
      <div className={styles.action}>
        <Button
          size={'m'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          onClick={() => onWithdraw(item)}
        >
          Continue
        </Button>
        <Button
          onClick={() => setView(IModalView.withdrawInfo)}
          size={'m'}
          color={'secondary'}
          fillStyle={false}
          fullWidth={false}
        >
          No
        </Button>
      </div>
    </div>
  );
};
