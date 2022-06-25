import { FC, useState } from 'react';
import { IPack } from 'src/common/models/pack';
import { PackList } from '../PackList';
import styles from './PackPage.module.scss';
import PageHeader from '@components/shared/PageHeader';
import Container from '@components/shared/Container';
import { PackModalBlock, PackModalViews } from '../PackModalBlock';
import { INFT } from '@type/nft';
import Modal from '@components/modal';
import { NFTDetail } from '@components/nft/NFTDetail';

export interface IPackPageProps {
  packs: IPack[];
  handleOpenPack: (packId: number) => void;
  revealedNFT?: INFT;
}

export const PackPage: FC<IPackPageProps> = ({
  packs,
  handleOpenPack,
  revealedNFT,
}) => {
  const [selectedNFTId, setSelectedNFTId] = useState<number | null>(null);
  const [chosenPack, setChosenPack] = useState<IPack | undefined>(undefined);
  const [modalView, setModalView] = useState<PackModalViews>(
    PackModalViews.detail
  );

  const handleBlockClose = () => {
    setChosenPack(undefined);
    setModalView(PackModalViews.detail);
  };

  const onCardClick = (pack: IPack) => {
    setChosenPack(pack);
  };

  const onPackAction = (pack: IPack) => {
    setChosenPack(pack);
    setModalView(PackModalViews.buy_pack);
  };

  const gotoNFT = () => {
    setChosenPack(undefined);
    revealedNFT && setSelectedNFTId(revealedNFT.id);
  };

  return (
    <Container className={styles.wrapper}>
      <PageHeader className={styles.header}>Packs</PageHeader>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.{' '}
      </div>
      <PackList
        packs={packs}
        onCardClick={onCardClick}
        onPackAction={onPackAction}
      />
      {chosenPack && (
        <PackModalBlock
          chosenPack={chosenPack}
          modalView={modalView}
          setModalView={setModalView}
          handleBlockClose={handleBlockClose}
          handleOpenPack={handleOpenPack}
          revealedNFT={revealedNFT}
          gotoNFT={gotoNFT}
        />
      )}
      <Modal
        show={selectedNFTId !== null}
        onClose={() => setSelectedNFTId(null)}
        modalData={{ selectedNFTId }}
        size='l'
      >
        {revealedNFT && (
          <NFTDetail nft={revealedNFT} setSelectedNFTId={setSelectedNFTId} />
        )}
      </Modal>
    </Container>
  );
};
