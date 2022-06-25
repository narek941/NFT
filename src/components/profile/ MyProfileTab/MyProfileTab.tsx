import { Card } from '@components/Card';
import { ICardItem } from '@components/Card/Card';
import { PackCard } from '@components/pack/PackCard';
import { INFTDetail } from '@type/nft';
import { FC } from 'react';
import { IPack } from 'src/common/models/pack';
import { CardSection } from '../CardSection';
import styles from './MyProfileTab.module.scss';
import { SwiperSlide } from 'swiper/react';
import { createCardItemFromNFTToken } from '@utils/nftUtils';
import { IMyNFT } from '@type/ntf-token';
import { createPackFromToken } from '../../../common/utils/pack-utils';

export interface IMyProfileClickHandlers {
  all: () => void;
  utility: () => void;
  mergeable: () => void;
  pack: () => void;
}

export interface IMyProfileTabProps {
  nftList: INFTDetail[] | IMyNFT[] | any[];
  packList: IPack[];
  onClickHandlers: IMyProfileClickHandlers;
  onNFTCardClick: (item: ICardItem) => void;
  onPackCardClick: (pack: IPack) => void;
  onPackAction: (pack: IPack) => void;
}

export const MyProfileTab: FC<IMyProfileTabProps> = ({
  nftList,
  packList,
  onClickHandlers,
  onNFTCardClick,
  onPackAction,
  onPackCardClick,
}) => {
  const mergeableNFTs = nftList.filter((nft) => nft.mergeable);
  const utilityNFTs = nftList.filter((nft) => Boolean(nft.utilityType));

  const createPackCards = (packs) => {
    return packs.map((pack) => (
      <SwiperSlide key={pack.id}>
        <PackCard
          item={createPackFromToken(pack)}
          onCardClick={onPackCardClick}
          onButtonClick={onPackAction}
        />
      </SwiperSlide>
    ));
  };

  const createNFTCards = (nfts: INFTDetail[] | IMyNFT[]) => {
    return nfts.map((nft) => {
      return (
        <SwiperSlide key={nft.tokenId || nft.id}>
          <Card
            className={styles.card}
            key={nft.id}
            item={createCardItemFromNFTToken(nft)}
            isNFTEntity
            isOwned
            onClick={onNFTCardClick}
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      {!!nftList.length && (
        <>
          <CardSection
            className={styles.section}
            text='Cool NFTs!'
            total={nftList.length}
            buttonText='See all NFTs'
            onButtonClick={onClickHandlers.all}
          >
            {createNFTCards(nftList)}
          </CardSection>
        </>
      )}
      {!!utilityNFTs.length && (
        <CardSection
          className={styles.section}
          text='NFTs with Utility!'
          total={utilityNFTs.length}
          buttonText='View now!'
          onButtonClick={onClickHandlers.utility}
        >
          {createNFTCards(utilityNFTs)}
        </CardSection>
      )}
      {!!mergeableNFTs.length && (
        <CardSection
          className={styles.section}
          text='Mergeable NFTs!'
          total={mergeableNFTs.length}
          buttonText='Merge now!'
          onButtonClick={onClickHandlers.mergeable}
        >
          {createNFTCards(mergeableNFTs)}
        </CardSection>
      )}
      {!!packList.length && (
        <CardSection
          className={styles.section}
          text='Unopened Packs'
          total={packList.length}
          buttonText='Open now!'
          onButtonClick={onClickHandlers.pack}
        >
          {createPackCards(packList)}
        </CardSection>
      )}
    </div>
  );
};
