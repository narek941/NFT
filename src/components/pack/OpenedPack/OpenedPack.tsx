import Badge from '@components/shared/Badge';
import Button from '@components/shared/Button';
import { ExternalImage } from '@components/shared/ExternalImage';
import Sticker from '@components/shared/Sticker';
import { INFT } from '@type/nft';
import { FC } from 'react';
import styles from './OpenedPack.module.scss';
import Placeholder from '/public/assets/img/img-placeholder.svg';

export interface IOpenedPackProps {
  nft: INFT;
  gotoNFT: () => void;
}

export const OpenedPack: FC<IOpenedPackProps> = ({ nft, gotoNFT }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['new-nft']}>Your new NFT!</div>
      <div className={styles['image-wrapper']}>
        {!nft.rarity && (
          <Sticker className={styles.sticker}>{nft.rarity}Sticker</Sticker>
        )}
        {nft.mediaUrl ? (
          <ExternalImage
            className={styles.image}
            src={nft.mediaUrl}
            alt={nft.name}
            attachPreview
          />
        ) : (
          <Placeholder className={styles.noImage} width='93' height='93' />
        )}
      </div>
      <div className={styles.title}>{nft.name}title</div>
      <div className={styles.badges}>
        {nft.rarity && (
          <Badge rounded color='secondary' size='m'>
            {nft.rarity}
          </Badge>
        )}
        {nft.utilityType && (
          <Badge rounded color='secondary' size='m'>
            {nft.utilityType}
          </Badge>
        )}
        {nft.mergeable && (
          <Badge rounded color='secondary' size='m'>
            Mergeable
          </Badge>
        )}
      </div>
      <Button
        className={styles.button}
        size={'s'}
        color={'blue'}
        onClick={() => gotoNFT()}
      >
        Go to NFT
      </Button>
    </div>
  );
};
