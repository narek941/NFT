import Modal from '@components/modal';

import ModalWrapper from '@components/ModalWrapper';

import React from 'react';

import TurnOff2FA from '../TurnOff2FA';

const PoUpSettings = ({ show, onClose, onClickTurnOff2FA, register }) => {
  const data = [{ name: 'Title 1' }];
  return (
    <Modal onClose={onClose} modalData={data} show={show}>
      <ModalWrapper>
        <TurnOff2FA onClick={onClickTurnOff2FA} register={register} />
      </ModalWrapper>
    </Modal>
  );
};

export default PoUpSettings;
