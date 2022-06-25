import Modal from '@components/modal';
import { OpenedPack } from '@components/pack/OpenedPack';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { nft } from 'src/__mocks__/nft';

export default {
  title: 'Components/OpenedPack',
  component: OpenedPack,
} as ComponentMeta<typeof OpenedPack>;

const Template: ComponentStory<typeof OpenedPack> = ({ nft, gotoNFT }) => {
  const [showModal, setShowModal] = useState(false);
  const [bgShow, setBgShow] = useState<boolean>(false);
  return (
    <>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        modalData={{ nft }}
        backgroundStyles={bgShow}
        size='l'
      >
        <OpenedPack nft={nft} gotoNFT={gotoNFT} />
      </Modal>
      <Button
        onClick={() => {
          setShowModal(true);
          setBgShow(true);
        }}
      >
        Show Opened pack Popup
      </Button>
    </>
  );
};

export const DefaultOpenedPack = Template.bind({});
DefaultOpenedPack.args = {
  nft: nft,
  gotoNFT: () => console.log('got nft: '),
};
