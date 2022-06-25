import Button from '@components/shared/Button';
import { ExternalImage } from '@components/shared/ExternalImage';
import Link from 'next/link';
import router from 'next/router';
import { FC } from 'react';
import { IPack } from 'src/common/models/pack';
import styles from './PackPaymentSuccess.module.scss';
import Placeholder from '/public/assets/img/img-placeholder.svg';

export interface IPackPaymentSuccessProps {
  pack: IPack;
  onOpenPack: (pack: IPack) => void;
}

export const PackPaymentSuccess: FC<IPackPaymentSuccessProps> = ({
  pack,
  onOpenPack,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        {pack.imageUrl ? (
          <ExternalImage
            className={styles.image}
            src={pack.imageUrl}
            alt={pack.name}
            width='160'
            height='188'
          />
        ) : (
          <Placeholder className={styles.noImage} width='93' height='93' />
        )}
      </div>
      <div className={styles.title}>Payment Success</div>
      <div className={styles.collection}>
        <div>NFT from</div>
        <Link href={`/collection/${pack.collection.id}`}>
          {pack.collection.name}
        </Link>
      </div>
      <Button
        className={styles.button}
        size={'s'}
        color={'blue'}
        fillStyle={false}
        fullWidth={false}
        onClick={() => onOpenPack(pack)}
      >
        Open Pack now
      </Button>
      <Button
        className={styles.button}
        size={'s'}
        color='transparent'
        fillStyle={true}
        fullWidth={false}
        onClick={async () => await router.push(`/my-profile?tab=my-packs`)}
      >
        View your Packs
      </Button>
    </div>
  );
};
