import Modal from '@components/modal';
import { WithdrawDetail } from '@components/withdraw/WithdrawDetail';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { nftList } from '../../../__mocks__/nftList';
import { INFT } from '@type/nft';
import { IModalView } from '../../../common/models/modal-view';

export default {
  title: 'Components/WithdrawDetail',
  component: WithdrawDetail,
} as ComponentMeta<typeof WithdrawDetail>;

const item = nftList[Math.floor(Math.random() * nftList.length)];

const Template: ComponentStory<typeof WithdrawDetail> = ({ onWithdraw }) => {
  const [view, setView] = useState<IModalView>();
  const [withdrawSelect, setWithdrawSelect] = useState<INFT | undefined>(
    undefined
  );

  return (
    <>
      <Modal
        show={!!withdrawSelect}
        onClose={() => setWithdrawSelect(undefined)}
        modalData={{ withdrawSelect }}
        size='l'
      >
        {withdrawSelect && (
          <WithdrawDetail
            onWithdraw={onWithdraw}
            setView={setView}
            item={withdrawSelect}
            viewDetail={IModalView.withdrawInfo}
          />
        )}
      </Modal>

      <Button
        onClick={() =>
          setWithdrawSelect(nftList[Math.floor(Math.random() * nftList.length)])
        }
      >{`Show `}</Button>
    </>
  );
};

export const DefaultWithdrawInfo = Template.bind({});
DefaultWithdrawInfo.args = {
  item,
  viewDetail: IModalView.withdrawInfo,
};

export const DefaultWithdrawInstallWallet = Template.bind({});
DefaultWithdrawInstallWallet.args = {
  item: nftList[Math.floor(Math.random() * nftList.length)],
  viewDetail: IModalView.withdrawInstallWallet,
  onWithdraw: (withdraw) => console.log(withdraw),
};

export const DefaultWithdrawConnectWallet = Template.bind({});
DefaultWithdrawConnectWallet.args = {
  item: nftList[Math.floor(Math.random() * nftList.length)],
  viewDetail: IModalView.withdrawInstallWallet,
};

export const DefaultWithdrawSuccess = Template.bind({});
DefaultWithdrawSuccess.args = {
  item: nftList[Math.floor(Math.random() * nftList.length)],
  viewDetail: IModalView.withdrawInstallWallet,
};
