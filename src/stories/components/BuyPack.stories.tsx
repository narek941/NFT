import { BuyPack } from '@components/pack/BuyPack';
import Modal from '@components/modal';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IPack } from 'src/common/models/pack';
import { pack } from 'src/__mocks__/pack';

export default {
  title: 'Components/BuyPack',
  component: BuyPack,
} as ComponentMeta<typeof BuyPack>;

const Template: ComponentStory<typeof BuyPack> = ({
  pack,
  onCardBuy,
  onCryptoBuy,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        modalData={{ pack }}
        size='l'
      >
        <BuyPack pack={pack} onCardBuy={onCardBuy} onCryptoBuy={onCryptoBuy} />
      </Modal>
      <Button onClick={() => setShowModal(true)}>Show Buy Pack Popup</Button>
    </>
  );
};

export const DefaultBuyPack = Template.bind({});
DefaultBuyPack.args = {
  pack,
  onCardBuy: (pack: IPack) => console.log('buy by card: ', pack),
  onCryptoBuy: (pack: IPack) => console.log('buy by crypto: ', pack),
};
