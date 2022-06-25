import Badge from '@components/shared/Badge';
import cn from 'classnames';
import { FC } from 'react';
import React from 'react';
import { renderPrice } from 'src/common/utils/parse-utils';
import styles from './DetailViewInfo.styles.module.scss';
import { NFTDetailViews } from '../NFTDetail';
import { LikeHelper } from '@shared/Like/Like';
import IconValidUser from 'public/field-icons/valid-user.svg';
import IconPerson from 'public/field-icons/person-small.svg';

import BuyButton from './BuyButton';
import RarityRank from '@shared/RarityRank';
import RarityScore from '@shared/RarityScore';
import BlockchainNetwork from '@shared/BlockchainNetwork';
import classNames from 'classnames';

export interface IDetailViewInfoProps {
  nft: any; //TODO need to re write all types
  onClick: (view: NFTDetailViews) => void;
}

export const DetailViewInfo: FC<IDetailViewInfoProps> = ({ nft, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <div className={styles.title}>{nft.name}</div>
        <div className={styles.statistic}>
          <div className={styles.owner}>
            <div>Creator:</div>
            <div className={styles.img}>
              <IconPerson className={styles['icon-person']} />
            </div>
            <div className={styles['owner--name']}>
              {nft.collection?.whitelabel?.name || ''}
            </div>
            <IconValidUser className={styles['icon-validUser']} />
          </div>
          {nft.collection && (
            <div className={styles.likes}>
              <div className={styles['likes-item']}>
                {LikeHelper(nft, 'default')}
                <span className={styles['likes-item-text']}>
                  {nft.likesAmount || 0}
                </span>
              </div>
              {/* Disable view as it is not ready now */}
              {/* <div>
                <IconOpenEye className={styles['icon-open-eye']} />
                <span className={styles['likes-item-text']}>785</span>
              </div> */}
            </div>
          )}
        </div>
        {nft.collection && (
          <div className={styles['sub-statistic']}>
            <div
              className={classNames(styles.owner, styles['owner-collection'])}
            >
              <div>Collection: </div>
              <div className={styles['owner--name']}>
                {nft.collection?.name || ''}
              </div>
            </div>
            <BlockchainNetwork network={nft.collection.network} />
          </div>
        )}
        <hr className={styles['line-modal']} />
        <div className={styles['badge-list']}>
          {nft.rarity && (
            <Badge rounded color='secondary' size='m'>
              {nft.rarity}
            </Badge>
          )}
          {nft.utilityType && (
            <Badge rounded color='light' size='m'>
              {nft.utilityType}
            </Badge>
          )}
          {nft.mergeable && (
            <Badge rounded color='dark' size='m'>
              MERGEABLE
            </Badge>
          )}
        </div>
        <div className={styles.details__meta}>
          <div className={styles.row}>
            {nft.collection && nft.collection.distribution !== 'PACKS' && (
              <>
                <div className={cn(styles.details__col, styles.col)}>
                  <div className={styles.details__label}>Price</div>
                  <div
                    className={cn(
                      styles.details__text,
                      styles['details__text--price']
                    )}
                  >
                    ${renderPrice(nft.price)}
                  </div>
                </div>
                <div className={cn(styles.details__col, styles.col)}>
                  <div className={styles.details__label}>Available:</div>
                  <div
                    className={styles.details__text}
                  >{`${nft.availableSupply}/${nft.supply}`}</div>
                </div>
              </>
            )}

            <div className={cn(styles.details__col, styles.col)}>
              <div className={styles.details__label}>Rarity Score:</div>
              <RarityScore
                className={styles.details__text}
                rarityScore={nft.rarityScore}
              />
            </div>

            <div className={cn(styles.details__col, styles.col)}>
              <div className={styles.details__label}>Rarity Rank:</div>
              <RarityRank
                className={styles.details__text}
                rarityRank={nft.rarityRank}
              />
            </div>
          </div>
        </div>
      </div>
      <BuyButton
        availableSupply={nft.availableSupply}
        distribution={nft?.collection?.distribution}
        onClick={React.useCallback(
          () => onClick(NFTDetailViews.buyWith),
          [onClick]
        )}
        collectionId={nft?.collection?.id}
      />
    </div>
  );
};
