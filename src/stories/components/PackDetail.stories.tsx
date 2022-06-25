import Modal from '@components/modal';
import { PackDetail } from '@components/pack/PackDetail';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IPack } from 'src/common/models/pack';
import { pack } from 'src/__mocks__/pack';

export default {
  title: 'Components/PackDetail',
  component: PackDetail,
} as ComponentMeta<typeof PackDetail>;

const sold_pack = { ...pack };
sold_pack.availableSupply = 0;

const ownedPack = { ...pack };
ownedPack.packsNft = [];

const Template: ComponentStory<typeof PackDetail> = ({
  pack,
  onPackAction,
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
        <PackDetail pack={pack} onPackAction={onPackAction} />
      </Modal>
      <Button onClick={() => setShowModal(true)}>Show Pack Detail</Button>
    </>
  );
};

export const DefaultPackDetail = Template.bind({});
DefaultPackDetail.args = {
  pack,
  onPackAction: (pack: IPack) => console.log('handle buy pack: ', pack),
};

export const SoldPackDetail = Template.bind({});
SoldPackDetail.args = {
  pack: sold_pack,
  onPackAction: (pack: IPack) => console.log('handle buy pack: ', pack),
};

export const OwnedPackDetail = Template.bind({});
OwnedPackDetail.args = {
  pack: ownedPack,
  onPackAction: (pack: IPack) => console.log('handle open pack: ', pack),
};
