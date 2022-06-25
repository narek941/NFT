import React from 'react';
import CardLarge from '@components/CardLarge';
import Modal from '@components/modal';
import styles from './PopUpMergeNFT.module.scss';

const PopUpMergeNFT = ({ onClose, show, onClickCardGotNFT, item }) => {
  const data = [{ name: 'Title 1' }];
  return (
    <Modal
      className={styles.modal}
      onClose={onClose}
      modalData={data}
      show={show}
      backgroundStyles
    >
      <div className={styles.container}>
        <div className={styles.heading}>Your new NFT!</div>
        <CardLarge
          className={styles.card}
          item={item}
          onClickCard={onClickCardGotNFT}
        />
      </div>
    </Modal>
  );
};

export default PopUpMergeNFT;
