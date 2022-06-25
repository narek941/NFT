import React, { ComponentType, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './RedeemCard.module.scss';
import Placeholder from 'public/assets/img/img-placeholder.svg';
import Button from '@shared/Button';
import Badge from '@shared/Badge';
import RarityScore from 'public/other/rarityScore_small.svg';
import { ExternalImage } from '@shared/ExternalImage';
import ActivatedBadge from '@shared/Badge/ActivatedBadge';
import clsx from 'clsx';
import ValidUser from 'public/field-icons/valid-user.svg';
import PersonSmall from '/public/field-icons/person-small.svg';
import { IMyNFT } from '@type/ntf-token';
import { useMetamask } from '@hooks/useMetamask';
import { handleRedeem } from '@components/redeem/redeem.utils';

interface IRedeemCardProps {
  token: IMyNFT;
  onRedeemSelect: (redeem: IMyNFT) => void;
  onRedeemBtnClick: (redeem: IMyNFT) => void;
}

export const RedeemCard: ComponentType<IRedeemCardProps> = ({
  token,
  onRedeemSelect,
  onRedeemBtnClick,
}) => {
  const [loading, setLoading] = useState(false);
  const { getMetamaskAddress } = useMetamask();
  const _getButtonText = () => {
    if (token.utilityStatus === 'ACTIVATABLE') {
      return 'Activate Now';
    }
    if (token.utilityStatus === 'REDEEMABLE') {
      return 'Redeem Now';
    }
    return '';
  };

  return (
    <div
      className={clsx(
        styles.redeemItem,
        token.utilityStatus == 'activated' && styles.cardActivated
      )}
      onClick={(e) => onRedeemSelect(token)}
    >
      <div className={styles.media}>
        {token.nft.mediaUrl ? (
          <ExternalImage
            className={styles.image}
            src={token.nft.mediaUrl}
            alt={token.nft.description}
          />
        ) : (
          <Placeholder className={styles.image} />
        )}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.firstBlock}>
          <div className={styles.infoTitle}>{token.nft.name || ''}</div>
          <div className={styles.statistic}>
            <div className={styles.owner}>
              <div className={styles['owner-title']}>Creator:</div>
              <div className={styles.img}>
                <PersonSmall
                  className={styles['icon-person']}
                  width='18px'
                  height='18px'
                />
              </div>
              <b>{token.nft.collection.whitelabel.name || ''}</b>
              <ValidUser className={styles['icon-validUser']} />
            </div>
            <div className={styles.owner}>
              <div className={styles['owner-title']}>Collection: </div>
              <b>{token.nft.collection?.name || 'Cool Cat #1'}</b>
            </div>
          </div>
          {token.utilityStatus == 'ACTIVATED' && (
            <ActivatedBadge className={styles['activated-badge']} />
          )}
          {token.utilityStatus !== 'ACTIVATED' && (
            <Button
              loading={loading}
              disabled={loading}
              className={styles.redeemButton}
              size={'l'}
              color={'blue'}
              fillStyle={false}
              fullWidth={false}
              onClick={(e) => {
                e.stopPropagation();
                handleRedeem(
                  token,
                  setLoading,
                  getMetamaskAddress,
                  onRedeemBtnClick,
                  onRedeemBtnClick
                );
              }}
            >
              {_getButtonText()}
            </Button>
          )}
        </div>

        <hr className={styles['line-modal']} />
        <div className={styles.metaData}>
          <div className={styles['badge-list']}>
            <Badge className={styles.sBadge} rounded color='secondary' size='m'>
              {token.nft.rarity.toUpperCase()}
            </Badge>
            {token.utilityStatus && (
              <Badge
                className={styles.sBadge}
                rounded
                color='secondary'
                size='m'
              >
                {token.utilityStatus.toUpperCase()}
              </Badge>
            )}
          </div>
          <div className={styles.details__meta}>
            <div className={styles.details__row}>
              <div className={cn(styles.details__col, styles.details__first)}>
                <div className={styles.details__text}>#1</div>
              </div>
              <div className={cn(styles.details__col, styles.details__last)}>
                <div className={styles.details__text}>
                  <RarityScore
                    width='10'
                    height='9'
                    className={styles['icon-rarityScore']}
                  />
                  {token.nft.rarityScore}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.experience}>
          <div className={styles['experience-title']}>Utility information</div>
          <div className={styles['experience-text']}>
            {token.nft.utilityExperience ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '}
          </div>
        </div>
        <div className={styles.moreAbout}>
          <a>See more about NFT</a>
        </div>
      </div>
    </div>
  );
};
