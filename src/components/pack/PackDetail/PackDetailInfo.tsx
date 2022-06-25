import React, { FC } from 'react';

import { IPack } from 'src/common/models/pack';
import styles from './PackDetailInfo.module.scss';
import PersonSmall from '/public/field-icons/person-small.svg';
import Like from '/public/field-icons/heart.svg';
import Share from '/public/field-icons/share.svg';
import Badge from '@components/shared/Badge';
import Button from '@components/shared/Button';
import ValidUser from 'public/field-icons/valid-user.svg';
import Link from 'next/link';
import BuyButton from './BuyButton';
import BlockchainNetwork from '@shared/BlockchainNetwork';

export interface IPackDetailInfoProps {
  pack: any; //TODO need to re write all types
  onPackAction: (pack: IPack) => void;
}

export const PackDetailInfo: FC<IPackDetailInfoProps> = ({
  pack,
  onPackAction,
}) => {
  const isSold = pack.availableSupply === 0;
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>{pack.name}</div>
        <div className={styles.statistic}>
          <div className={styles.owner}>
            <div>Creator:</div>
            <div className={styles.img}>
              <PersonSmall
                className={styles['icon-person']}
                width='18px'
                height='18px'
              />
            </div>
            <b>{pack.collection?.whitelabel.name || ''}</b>
            <ValidUser className={styles['icon-validUser']} />
          </div>
          {/* Packs should not contain likes for now */}
          {/* <div className={styles.likes}>
            <div className={styles['likes-item']}>
              <Like className={styles['icon-likes-checked']} />
              <span className={styles['likes-item-text']}>215</span>
            </div>
            <div style={{ display: 'none' }}>
              <Share className={styles['icon-share']} />
            </div>
          </div> */}
        </div>
        {pack.collection && (
          <div className={styles.statistic}>
            <div className={styles.owner}>
              <div>NFT from:</div>
              <Link href={`/collection/${pack.collection.id}`}>
                <a className={styles.link}>{pack.collection.name}</a>
              </Link>
            </div>
            <BlockchainNetwork network={pack.collection.network} />
          </div>
        )}
        {isSold && !pack.packsNft ? (
          <div className={styles['section-highlight']}>
            <div>SOLD OUT</div>
            <div>Lorem ipsum dolor sit amet</div>
          </div>
        ) : (
          <hr className={styles['line-modal']} />
        )}
        <div className={styles['badge-description']}>
          In this pack chances to get NFT of rarities:
        </div>
        <div className={styles['badge-list']}>
          {Object.keys(pack.contentRule)
            .filter((rule) => pack.contentRule[rule] !== 0)
            .map((rule, index) => (
              <Badge key={index} rounded color='secondary' size='m'>
                {rule}
              </Badge>
            ))}
        </div>
      </div>
      <BuyButton
        availableSupply={pack.availableSupply}
        packsNft={pack.packsNft}
        onClick={React.useCallback(
          () => onPackAction(pack),
          [onPackAction, pack]
        )}
        price={pack.price}
        collectionId={pack?.collection?.id}
      />
      {pack.packsNft && !pack.packsNft[0].opened && (
        <div className={styles.actions}>
          <Button
            size={'s'}
            color={'blue'}
            fillStyle={false}
            fullWidth={false}
            onClick={() => onPackAction(pack)}
          >
            Open now
          </Button>
        </div>
      )}
    </div>
  );
};
