import Modal from '@components/modal';
import { AnimationPack } from '@components/pack/AnimationPack';
import Button from '@components/shared/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Components/AnimationPack',
  component: AnimationPack,
} as ComponentMeta<typeof AnimationPack>;

const Template: ComponentStory<typeof AnimationPack> = (args) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        modalData={{}}
        size='l'
      >
        <AnimationPack {...args} />
      </Modal>
      <Button onClick={() => setShowModal(true)}>Show Animation Pack</Button>
    </>
  );
};

export const DefaultAnimation = Template.bind({});
DefaultAnimation.args = {};
