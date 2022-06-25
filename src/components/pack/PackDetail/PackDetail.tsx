import { IPack } from 'src/common/models/pack';
import styles from './PackDetail.module.scss';
import Placeholder from '/public/assets/img/img-placeholder.svg';
import { ExternalImage } from '@components/shared/ExternalImage';
import { FC } from 'react';
import { PackDetailInfo } from './PackDetailInfo';
import { PackContains } from './PackContains';

export interface PackDetailProps {
  pack: IPack;
  onPackAction: (pack: IPack) => void;
}

export const PackDetail: FC<PackDetailProps> = ({ pack, onPackAction }) => {
  return (
    <div className={styles.general}>
      <div className={styles.main}>
        <div>
          <div className={styles.media}>
            {(pack.imageUrl && (
              <ExternalImage
                src={pack.imageUrl}
                objectFit='cover'
                attachPreview
              />
            )) || <Placeholder />}
          </div>
        </div>

        <div className={styles['info-block']}>
          <PackDetailInfo pack={pack} onPackAction={onPackAction} />
        </div>
      </div>

      <div className={styles['description-block']}>
        <div className={styles['description-block-header']}>Description</div>
        <div className={styles['description-block-body']}>
          {pack.description}
        </div>
        <PackContains collection={pack.collection} />
      </div>
    </div>
  );
};
