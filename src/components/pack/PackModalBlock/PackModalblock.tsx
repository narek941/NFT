import Modal from '@components/modal';
import modalStyles from '@components/modal/modal.module.scss';
import { PaymentIntent } from '@stripe/stripe-js';
import { INFT } from '@type/nft';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { IPack } from 'src/common/models/pack';
import { AnimationPack } from '../AnimationPack';
import { BuyPack } from '../BuyPack';
import { OpenedPack } from '../OpenedPack';
import { PackDetail } from '../PackDetail';
import { PackPaymentSuccess } from '../PackPaymentSuccess';
import { PayByCard } from '../PayByCard';
import styles from './PackModalBlock.module.scss';
import { Spinner } from '@shared/Spinner';

export interface IPackModalBlockProps {
  chosenPack: IPack | any;
  modalView: PackModalViews;
  setModalView: Dispatch<SetStateAction<PackModalViews>>;
  handleBlockClose: () => void;
  handleOpenPack: (packId: number) => void;
  revealedNFT?: INFT;
  gotoNFT: () => void;
}

export enum PackModalViews {
  detail = 'detail',
  buy_pack = 'buy_pack',
  payment_card = 'payment_card',
  payment_crypto = 'payment_crypto',
  payment_success = 'payment_sucess',
  opening_pack = 'opening_pack',
  opened_pack = 'opened_pack',
}

export const PackModalBlock: FC<IPackModalBlockProps> = ({
  chosenPack,
  modalView,
  setModalView,
  handleBlockClose,
  handleOpenPack,
  revealedNFT,
  gotoNFT,
}) => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | undefined>(
    undefined
  );

  useEffect(() => {
    if (revealedNFT && modalView === PackModalViews.opening_pack) {
      setModalView(PackModalViews.opened_pack);
    }
  }, [revealedNFT, modalView]);

  const onPackAction = () => {
    if (chosenPack.packsNft) {
      // pack is alrady owned
      setModalView(PackModalViews.opened_pack);
      handleOpenPack(chosenPack.id);
      return;
    }
    if (modalView === PackModalViews.payment_success) {
      // pack has just been bought
      setModalView(PackModalViews.opened_pack);
      handleOpenPack(chosenPack.id);
      return;
    }
    // pack is not owned and going to be bought
    setModalView(PackModalViews.buy_pack);
  };

  const generateModalUI = () => {
    switch (modalView) {
      case PackModalViews.detail:
        return <PackDetail pack={chosenPack} onPackAction={onPackAction} />;
      case PackModalViews.buy_pack:
        return (
          <BuyPack
            pack={chosenPack}
            onCardBuy={() => setModalView(PackModalViews.payment_card)}
            onCryptoBuy={() => setModalView(PackModalViews.payment_crypto)}
          />
        );
      case PackModalViews.payment_card:
        return (
          <PayByCard
            pack={chosenPack}
            onSuccess={() => setModalView(PackModalViews.payment_success)}
            goBack={() => setModalView(PackModalViews.detail)}
          />
        );
      case PackModalViews.payment_success:
        return (
          <PackPaymentSuccess pack={chosenPack} onOpenPack={onPackAction} />
        );
      case PackModalViews.opening_pack:
        return <AnimationPack />;
      case PackModalViews.opened_pack:
        return revealedNFT ? (
          <>
            <div className={modalStyles['background-wrapper']}></div>
            <OpenedPack nft={revealedNFT} gotoNFT={gotoNFT} />
          </>
        ) : (
          <AnimationPack />
        );
      default:
        return <PackDetail pack={chosenPack} onPackAction={onPackAction} />;
    }
  };

  return (
    <>
      <Modal
        show={!!chosenPack}
        onClose={handleBlockClose}
        modalData={{ chosenPack }}
        size='l'
      >
        {chosenPack && generateModalUI()}
      </Modal>
    </>
  );
};
