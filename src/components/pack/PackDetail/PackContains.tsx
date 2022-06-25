import Button from '@components/shared/Button';
import { ExternalImage } from '@components/shared/ExternalImage';
import { ICollection } from '@type/ICollection';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './PackContains.module.scss';
import OptionDefault from '/public/icon-options/option_a.svg';

export interface IPackContainsProps {
  collection: ICollection;
}

export const PackContains: FC<IPackContainsProps> = ({ collection }) => {
  const router = useRouter();

  const { id, name, imageUrl } = collection;

  return (
    <div className={styles.wrapper}>
      <div className={styles['info-block']}>
        <div>This pack contains NFT from:</div>
        {imageUrl ? (
          <ExternalImage src={imageUrl} className={styles['image']} />
        ) : (
          <OptionDefault />
        )}
        <div>{name}</div>
      </div>
      <div className={styles['button-block']}>
        <Button
          size={'s'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          onClick={async () => await router.push(`collection/${id}`)}
        >
          Open Collection
        </Button>
      </div>
    </div>
  );
};
