import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from '@components/modal';
import ModalWrapper from '@components/ModalWrapper';
import ModalContentWrapper from '@components/ModalContentWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalSubtitle from '@shared/ModalSubtitle';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const data = [{ name: 'Title 1' }, { name: 'Title 21' }, { name: 'Title 31' }];

const Template: ComponentStory<typeof Modal> = (args) => {
  return (
    <>
      <Modal {...args}>
        <ModalWrapper>
          <ModalTitle text='Sign in with' highLightedText='Niftables' />
          <ModalContentWrapper>
            <ModalIconPlaceholder>Header</ModalIconPlaceholder>
            <ModalSubtitle
              style={'bold'}
              text='Use your Niftables account for all of our white label platforms.'
            />
          </ModalContentWrapper>
        </ModalWrapper>
      </Modal>
    </>
  );
};

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  onClose: () => {
    console.log('Modal');
  },
  show: true,
  modalData: data,
};
