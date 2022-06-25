import { INFT } from '@type/nft';
import { ComponentType } from 'react';
import styles from './WithdrawCard.module.scss';
import Image from 'next/image';
import { renderPrice } from '../../../common/utils/parse-utils';

interface IWithdrawCardProps {
  nft: INFT;
  onWithdrawSelect: (nft: INFT) => void;
}

export const WithdrawCard: ComponentType<IWithdrawCardProps> = ({
  onWithdrawSelect,
  nft,
}) => {
  return (
    <>
      <div className={styles.item}>
        <div
          role={'dialog'}
          className={styles.card}
          onClick={() => onWithdrawSelect && onWithdrawSelect(nft)}
        >
          <div className={styles.body}>
            <div className={styles.media}>
              {(nft.mediaUrl && (
                <img
                  src={nft.mediaUrl}
                  alt=''
                  width={'325px'}
                  height={'325px'}
                />
              )) || (
                <Image
                  src={'/assets/img/img-placeholder.svg'}
                  width={'325px'}
                  height={'325px'}
                />
              )}
            </div>
            <div className={styles.title}>{nft.name}</div>
            <div className={styles.badge}>
              <span>{nft.rarity}</span>
            </div>
            <div className={styles.available}>Available: 6/10</div>
            <hr className={styles.line} />
          </div>
          <div className={styles.footer}>
            <div className={styles.coast}>${renderPrice(nft.price)}</div>
            <a className={styles.buy} href='#'>
              Claim
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
