import React, { ComponentType } from 'react';
import { INFT } from '@type/nft';
import styles from './RedeemInfo.module.scss';
import { ExternalImage } from '@shared/ExternalImage';
import Placeholder from '../../../../../public/assets/img/img-placeholder.svg';
import Button from '@shared/Button';
import Image from 'next/image';
import Badge from '@shared/Badge';
import cn from 'classnames';
import Accordion, { IAccordionProps } from '@shared/Accordion';
import { TableWithoutHeader } from '@shared/Tables/TableWithoutHeader';
import { IModalView } from '../../../../common/models/modal-view';
import ValidUser from 'public/field-icons/valid-user.svg';
import HrComponent from '@components/shared/HrComponent';
import ActivatedBadge from '@shared/Badge/ActivatedBadge';
import { IMyNFT } from '@type/ntf-token';
import PersonSmall from '/public/field-icons/person-small.svg';
import {
  handleTraitBooleanValue,
  renderDescription,
  renderTraitIndex,
} from '@utils/nftUtils';
import RarityRank from '@shared/RarityRank';
import RarityScore from '@shared/RarityScore';
import classNames from 'classnames';

import btnStyles from '@components/shared/Button/Button.module.scss';

interface IRedeemInfoProps {
  token: IMyNFT | any;
  setView: (view: IModalView) => void;
  handleWithdraw: (token: IMyNFT) => void;
}
export const RedeemInfo: ComponentType<IRedeemInfoProps> = ({
  token,
  setView,
  handleWithdraw,
}) => {
  const renderTraitsData = (traits: Record<string, string>) => {
    return Object.entries(traits).map(([key, value], index) => ({
      id: renderTraitIndex(index),
      title: <span className='text-bold'>{key}:</span>,
      desc: renderDescription(handleTraitBooleanValue(value) + ''),
      other: '',
    }));
  };

  const renderTraitsContent = (traits: Record<string, string>) => {
    const traitsData = renderTraitsData(traits);
    return <TableWithoutHeader rowsTable={traitsData} />;
  };

  const renderAccordionData = (nft: INFT) => {
    const basicData: IAccordionProps['data'] = [];
    if (nft.description) {
      basicData.push({
        title: 'Description',
        content: nft?.description,
      });
    }
    if (nft?.traits && Object.keys(nft?.traits).length !== 0) {
      basicData.push({
        title: 'Traits for NFT',
        content: renderTraitsContent(nft?.traits),
      });
    }
    if (nft?.utilityExperience) {
      basicData.push({
        title: 'Utility Experience',
        content: nft.utilityExperience,
      });
    }
    return basicData;
  };

  return (
    <div className={styles.general}>
      <div className={styles.main}>
        <div>
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
        </div>
        <div className={styles['info-block']}>
          <div className={styles.wrapper}>
            <div>
              <div className={styles.title}>{token.nft.name}</div>
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
                  <b>{token.nft.collection.whitelabel.name || ''}</b>
                  <ValidUser className={styles['icon-validUser']} />
                </div>
                <div className={styles.owner}>
                  <div>
                    Collection: <b>{token.nft.collection?.name}</b>
                  </div>
                  {token.utilityStatus == 'ACTIVATED' && (
                    <ActivatedBadge className={styles['activated-badge']} />
                  )}
                </div>
              </div>
              <HrComponent
                color='light'
                height='1'
                className={styles['line-modal']}
              />
              <div className={styles['badge-list']}>
                <Badge
                  className={styles.sBadge}
                  rounded
                  color='secondary'
                  size='m'
                >
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
                <div className={styles.row}>
                  <div className={cn(styles.details__col, styles.col)}>
                    <div className={styles.details__label}>Rarity Score:</div>
                    <RarityScore
                      className={styles.details__text}
                      rarityScore={token.nft.rarityScore}
                    />
                  </div>
                  <div className={cn(styles.details__col, styles.col)}>
                    <div className={styles.details__label}>Rarity Rank:</div>
                    <RarityRank
                      className={styles.details__text}
                      rarityRank={token.nft.rarityRank}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              {token.utilityStatus === 'REDEEMABLE' && (
                <Button
                  size={'m'}
                  color={'blue'}
                  fillStyle={false}
                  fullWidth={false}
                  onClick={() => setView(IModalView.redeemConfirm)}
                >
                  Redeem
                </Button>
              )}

              {token.utilityStatus === 'ACTIVATABLE' && (
                <Button
                  size={'m'}
                  color={'blue'}
                  fillStyle={false}
                  fullWidth={false}
                  onClick={() => setView(IModalView.redeemConfirm)}
                >
                  Activate
                </Button>
              )}
              {!token.claimed && (
                <Button
                  className={classNames(
                    styles['btn-withdraw'],
                    btnStyles['btn-withdraw']
                  )}
                  disabled={token.claimed}
                  size={'m'}
                  color={'blue'}
                  fillStyle={true}
                  fullWidth={false}
                  onClick={() => handleWithdraw(token)}
                >
                  <span>Withdraw</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Accordion
          size='l'
          color={'primary'}
          data={renderAccordionData(token?.nft)}
        />
      </div>
    </div>
  );
};
