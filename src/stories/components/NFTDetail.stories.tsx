import Modal from '@components/modal';
import { NFTDetail } from '@components/nft/NFTDetail';
import { NFTDetailViews } from '@components/nft/NFTDetail/NFTDetail';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { nft } from 'src/__mocks__/nft';

export default {
  title: 'Components/NFTDetail',
  component: NFTDetail,
} as ComponentMeta<typeof NFTDetail>;

const Template: ComponentStory<typeof NFTDetail> = ({ nft, defaultBlock }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        modalData={{ nft }}
        size='l'
      >
        <NFTDetail
          nft={nft}
          defaultBlock={defaultBlock}
          setSelectedNFTId={() => setShowModal(false)}
        />
      </Modal>
      <Button onClick={() => setShowModal(true)}>Show NFT Detail</Button>
    </>
  );
};

export const NFTDetailBlock = Template.bind({});
NFTDetailBlock.args = {
  nft,
  defaultBlock: NFTDetailViews.detail,
};

export const NFTPaymentBlock = Template.bind({});
NFTPaymentBlock.args = {
  nft,
  defaultBlock: NFTDetailViews.payment,
};
