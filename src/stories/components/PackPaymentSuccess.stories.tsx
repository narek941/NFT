import Modal from '@components/modal';
import { PackPaymentSuccess } from '@components/pack/PackPaymentSuccess';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IPack } from 'src/common/models/pack';
import { pack } from 'src/__mocks__/pack';

export default {
  title: 'Components/PackPaymentSuccess',
  component: PackPaymentSuccess,
} as ComponentMeta<typeof PackPaymentSuccess>;

const Template: ComponentStory<typeof PackPaymentSuccess> = ({
  pack,
  onOpenPack,
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
        <PackPaymentSuccess pack={pack} onOpenPack={onOpenPack} />
      </Modal>
      <Button onClick={() => setShowModal(true)}>
        Show Pack Payment Success Popup
      </Button>
    </>
  );
};

export const DefaultPackPaymentSuccess = Template.bind({});
DefaultPackPaymentSuccess.args = {
  pack,
  onOpenPack: (pack: IPack) => console.log('open pack: ', pack),
};
