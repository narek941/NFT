import { FC } from 'react';
import styles from './Card.styles.module.scss';
import cn from 'classnames';
import { ExternalImage } from '@components/shared/ExternalImage';
import Placeholder from '../../../public/assets/img/img-placeholder.svg';
import Badge from '@components/shared/Badge';
import { LikeHelper } from '@shared/Like/Like';
import VideoIcon from 'public/field-icons/video.svg';
import AudioIcon from 'public/field-icons/audio.svg';
import BuySection from './buy-section';
import RarityRank from '@shared/RarityRank';
import RarityScore from '@shared/RarityScore';

export interface ICardProps {
  item: ICardItem;
  onClick: (collection: ICardItem) => void;
  isLarge?: boolean;
  className?: string;
  isNFTEntity?: boolean;
  isOwned?: boolean;
  showLike?: boolean;
  showRarity?: boolean;
  distribution?: string;
}

export interface ICardItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  mediaUrl?: string;
  mediaType?: string;
  preview?: string;
  supply?: number;
  availableSupply?: number;
  rarity?: string;
  rarityScore?: string;
  utilityType?: string | null;
  mergeable?: boolean;
  ownerId?: number;
  likes?: Record<string, any>[];
  liked?: boolean;
  openSeaLink?: string;
  rarityRank?: string;
  distribution?: string;
}

export const Card: FC<ICardProps> = ({
  item,
  onClick,
  isLarge,
  className,
  isNFTEntity,
  isOwned,
  showLike,
  showRarity = true,
}: ICardProps) => {
  const imageClasses = cn(styles.image, { [styles['image--large']]: isLarge });
  const picUrl = item.imageUrl || item.mediaUrl;

  const renderAvailableBlock = () => {
    if (isOwned) {
      return <div style={{ display: 'none' }}>N/A</div>;
    }
    if (item.supply && item.availableSupply) {
      return (
        <>
          Available: <b>{`${item.availableSupply || 0}/${item.supply || 0}`}</b>
        </>
      );
    }
    return 'Not Available';
  };

  const renderFooter = () => {
    const ownedStyles = cn(styles.coast, styles['coast--owned']);
    if (!isNFTEntity) {
      return (
        <div className={styles.footer}>
          <div className={styles.coast}>#100</div>
          <div className={styles.coast}>{item.price}</div>
        </div>
      );
    }
    if (isOwned) {
      return (
        <div className={cn(styles.footer, styles['footer--owned'])}>
          <RarityRank className={ownedStyles} rarityRank={item.rarityRank} />
          <RarityScore className={ownedStyles} rarityScore={item.rarityScore} />
        </div>
      );
    }
    return (
      <BuySection
        distribution={item.distribution}
        price={item.price}
        availableSupply={!!item.availableSupply}
        openSeaLink={item.openSeaLink}
      />
    );
  };

  const renderImagePreview = (src: string) => {
    return (
      <ExternalImage
        className={imageClasses}
        src={src}
        alt={item.description}
        responsive
        height='220'
        width='220'
      />
    );
  };

  const renderPlaceholder = () => {
    return (
      <div className={styles['placeholder-wrapper']}>
        <Placeholder className={imageClasses} />
      </div>
    );
  };

  const isVideo = item.mediaType && item.mediaType.includes('video');

  const isAudio = item.mediaType && item.mediaType.includes('audio');

  const renderPreview = () => {
    const picUrl = item.preview || item.imageUrl || item.mediaUrl;
    const hasPreview = item.preview !== undefined;
    const isVideoOrAudio = isVideo || isAudio;
    if (!picUrl || (isVideoOrAudio && !hasPreview)) {
      return renderPlaceholder();
    }
    return renderImagePreview(picUrl);
  };

  return (
    <div
      className={cn(
        styles.wrapper,
        className,
        isLarge && [styles['wrapper--large']]
      )}
    >
      <div className={styles.card} onClick={() => onClick(item)}>
        <div className={styles.body}>
          {showRarity && (
            <div className={styles.rankInfo}>
              <RarityRank
                className={styles['rankInfo-item']}
                rarityRank={item.rarityRank}
              />
              <RarityScore
                className={styles['rankInfo-item']}
                rarityScore={item.rarityScore}
              />
            </div>
          )}

          <div className={styles.media}>
            {renderPreview()}
            <div
              className={styles.favorite}
              onClick={(e) => e.stopPropagation()}
            >
              {showLike && LikeHelper(item, 'primary')}
            </div>

            {isVideo && (
              <div className={styles['media-icon']}>
                <VideoIcon />
              </div>
            )}
            {isAudio && (
              <div className={styles['media-icon']}>
                <AudioIcon />
              </div>
            )}
          </div>

          <div className={styles.content}>
            <div className={styles.title}>{item.name}</div>
            {isNFTEntity && (
              <div className={styles.badges}>
                {item.rarity && (
                  <Badge
                    rounded
                    color='secondary'
                    size='m'
                    className={styles.sBadge}
                  >
                    {item.rarity}
                  </Badge>
                )}
                {item.utilityType && (
                  <Badge
                    rounded
                    color='secondary'
                    size='m'
                    className={styles.sBadge}
                  >
                    {item.utilityType}
                  </Badge>
                )}
                {item.mergeable && (
                  <Badge
                    rounded
                    color='secondary'
                    size='m'
                    className={styles.sBadge}
                  >
                    Mergeable
                  </Badge>
                )}
              </div>
            )}
            <div className={styles.availableBlock}>
              {renderAvailableBlock()}
            </div>
          </div>
        </div>
        <hr className={styles.line} />
        {renderFooter()}
      </div>
    </div>
  );
};
