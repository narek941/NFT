import React, { ComponentType } from 'react';
import { INFT, INFTDetail } from '@type/nft';
import styles from './WithdrawInfo.module.scss';
import PersonSmall from '/public/field-icons/person-small.svg';
import Image from 'next/image';
import Badge from '@shared/Badge';
import cn from 'classnames';
import Button from '@shared/Button';
import { ExternalImage } from '@shared/ExternalImage';
import Placeholder from '../../../../../public/assets/img/img-placeholder.svg';
import ValidUser from 'public/field-icons/valid-user.svg';
import Accordion, { IAccordionProps } from '@shared/Accordion';
import { TableWithoutHeader } from '@shared/Tables/TableWithoutHeader';
import { IModalView } from '../../../../common/models/modal-view';
import { IMyNFT } from '@type/ntf-token';
import {
  handleTraitBooleanValue,
  renderDescription,
  renderTraitIndex,
} from '@utils/nftUtils';
import RarityRank from '@shared/RarityRank';
import RarityScore from '@shared/RarityScore';
import { LikeHelper } from '@components/shared/Like/Like';
import IconOpenEye from 'public/field-icons/open-eye.svg';
import BlockchainNetwork from '@components/shared/BlockchainNetwork';

interface IWithdrawInfoProps {
  item: any;
  setView: (view: IModalView) => void;
  handleWithdraw: (item: IMyNFT) => void;
}
export const WithdrawInfo: ComponentType<IWithdrawInfoProps> = ({
  item,
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
    <>
      <div className={styles.general}>
        <div className={styles.main}>
          <div>
            <div className={styles.media}>
              {item.mediaUrl ? (
                <ExternalImage
                  className={styles.image}
                  src={item.mediaUrl}
                  alt={item.description}
                />
              ) : (
                <Placeholder className={styles.image} />
              )}
            </div>
          </div>
          <div className={styles['info-block']}>
            <div className={styles.wrapper}>
              <div>
                <div className={styles.title}>{item.name}</div>
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
                    <b>{item.nft.collection.whitelabel.name || ''}</b>
                    <ValidUser className={styles['icon-validUser']} />
                  </div>
                  {/* Likes are not ready for user nfts now*/}
                  {/* {item.nft.collection &&
                    item.nft.collection.distribution !== 'PACKS' && (
                      <div className={styles.likes}>
                        <div className={styles['likes-item']}>
                          {LikeHelper(item.nft)}
                          <span className={styles['likes-item-text']}>
                            {item.nft.likesAmount || 0}
                          </span>
                        </div>
                        <div>
                          <IconOpenEye className={styles['icon-open-eye']} />
                          <span className={styles['likes-item-text']}>785</span>
                        </div>
                      </div>
                    )} */}

                  {/*<div className={styles.likes}>*/}
                  {/*  <div className={styles['likes-item']}>*/}
                  {/*    {LikeHelper(item)}*/}
                  {/*    <span className={styles['likes-item-text']}>*/}
                  {/*      {item.likesAmount || 0}*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*  <div>*/}
                  {/*    <Image*/}
                  {/*      className={styles['likes-item-img']}*/}
                  {/*      src={'/field-icons/open-eye.svg'}*/}
                  {/*      width={'17px'}*/}
                  {/*      height={'11px'}*/}
                  {/*    />*/}
                  {/*    <span className={styles['likes-item-text']}>785</span>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                {item.nft.collection && (
                  <div className={styles['sub-statistic']}>
                    <div className={styles.owner}>
                      <div>Collection: </div>
                      <div className={styles['owner--bold']}>
                        {item.nft.collection?.name || ''}
                      </div>
                    </div>
                    <BlockchainNetwork network={item.nft.collection.network} />
                  </div>
                )}
                {/*{item.nft.collection && (*/}
                {/*  <div className={styles.owner}>*/}
                {/*    <div>Collection: </div>*/}
                {/*    <div className={styles['owner--bold']}>*/}
                {/*      {item.nft.collection?.name || ''}*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*)}*/}
                <hr className={styles['line-modal']} />
                <div className={styles['badge-list']}>
                  {item.rarity && (
                    <Badge rounded color='secondary' size='m'>
                      {item.rarity}
                    </Badge>
                  )}
                  {item.utilityType && (
                    <Badge rounded color='light' size='m'>
                      {item.utilityType}
                    </Badge>
                  )}
                  {/*{item.mergeable && (*/}
                  {/*  <Badge rounded color='dark' size='m'>*/}
                  {/*    MERGEABLE*/}
                  {/*  </Badge>*/}
                  {/*)}*/}
                </div>
                <div className={styles.details__meta}>
                  <div className={styles.row}>
                    <div className={cn(styles.details__col, styles.col)}>
                      <div className={styles.details__label}>Rarity Score:</div>
                      <RarityScore
                        className={styles.details__text}
                        rarityScore={item.nft.rarityScore}
                      />
                    </div>
                    <div className={cn(styles.details__col, styles.col)}>
                      <div className={styles.details__label}>Rarity Rank:</div>
                      <RarityRank
                        className={styles.details__text}
                        rarityRank={item.nft.rarityRank}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                {!item.claimed && (
                  <Button
                    size={'m'}
                    color={'blue'}
                    fillStyle={true}
                    onClick={() => handleWithdraw(item)}
                  >
                    Withdraw
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {item.description && (
          <div>
            <Accordion
              size='l'
              color={'primary'}
              data={renderAccordionData(item.nft || item)}
            />
          </div>
        )}
      </div>
    </>
  );
};
