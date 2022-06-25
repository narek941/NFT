import Modal from '@components/modal';
import { RedeemDetail } from '@components/redeem/RedeemDetail';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { INFTDetail } from '@type/nft';
import { redeemList } from '../../__mocks__/redeemList';
import { IModalView } from '../../common/models/modal-view';
import { IMyNFT } from '@type/ntf-token';

export default {
  title: 'Components/RedeemDetail',
  component: RedeemDetail,
} as ComponentMeta<typeof RedeemDetail>;

const Template: ComponentStory<typeof RedeemDetail> = ({
  onRedeem,
  onActivate,
  userEmail,
  viewDetail,
}) => {
  const [redeemModalShow, setRedeemModalShow] = useState<boolean>(false);
  const [redeemSelect, setRedeemSelect] = useState<IMyNFT | undefined>(
    redeemList[Math.floor(Math.random() * redeemList.length)]
  );

  return (
    <>
      <Modal
        show={redeemModalShow}
        onClose={() => {
          setRedeemModalShow(false);
          setRedeemSelect(undefined);
        }}
        modalData={{ redeemSelect }}
        size='l'
      >
        {redeemSelect && (
          <RedeemDetail
            onWithdraw={() => {
              console.log('withdraw');
            }}
            setView={(view) => {}}
            viewDetail={viewDetail}
            item={redeemSelect}
            onRedeem={onRedeem}
            onActivate={onActivate}
            userEmail={userEmail}
          />
        )}
      </Modal>
      <Button onClick={() => setRedeemModalShow(true)}>
        {`Show ${viewDetail}`}
      </Button>
    </>
  );
};

export const DefaultRedeemInfo = Template.bind({});
DefaultRedeemInfo.args = {
  item: redeemList[Math.floor(Math.random() * redeemList.length)],
  onActivate: (item) => console.log(item),
  onRedeem: (item) => console.log(item),
  userEmail: 'firstname.lastname@example.com',
  viewDetail: IModalView.redeemInfo,
};

export const DefaultRedeemConfirm = Template.bind({});
DefaultRedeemConfirm.args = {
  item: redeemList[Math.floor(Math.random() * redeemList.length)],
  onActivate: (item) => console.log(item),
  onRedeem: (item) => console.log(item),
  userEmail: 'firstname.lastname@example.com',
  viewDetail: IModalView.redeemConfirm,
};

export const DefaultRedeemConfirmed = Template.bind({});
DefaultRedeemConfirmed.args = {
  item: redeemList[Math.floor(Math.random() * redeemList.length)],
  onActivate: (item) => console.log(item),
  onRedeem: (item) => console.log(item),
  userEmail: 'firstname.lastname@example.com',
  viewDetail: IModalView.redeemConfirmed,
};
