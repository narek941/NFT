import React, { FC, useEffect, useState } from 'react';
import styles from './CollectionSelect.styles.module.scss';
import { ICollection } from '@type/ICollection';
import { Option } from '@components/shared/Option';
import { UseFormRegister, UseFormReset } from 'react-hook-form';
import AccordionItem from '@components/shared/Accordion/AccordionItem';

export interface ICollectionSelect {
  collections: ICollection[];
  callback: (id: number | undefined, collections: ICollection[]) => void;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
  header: string;
  collectionId?: any;
}

export const CollectionSelect: FC<ICollectionSelect> = ({
  collections,
  callback,
  register,
  reset,
  color,
  size,
  header,
  collectionId,
}) => {
  // const [searchValue, setSearchValue] = useState<string>('');
  const [searchCollections, setSearchCollections] =
    useState<ICollection[]>(collections);
  const [activeCollectionId, setActiveCollectionId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (collectionId) {
      setActiveCollectionId(collectionId);
      setSearchCollections(
        collections.filter((item) => item.id === collectionId)
      );
    } else {
      setSearchCollections(collections);
      setActiveCollectionId(undefined);
    }
  }, [collectionId]);

  const handleCollectionClick = (chosenCollectionId: number) => () => {
    if (chosenCollectionId === activeCollectionId) {
      setActiveCollectionId(undefined);
      setSearchCollections(collections);
      callback(undefined, collections);
      return;
    }
    const newCollections: ICollection[] = collections.filter(
      (collection) => collection.id === chosenCollectionId
    );
    setSearchCollections(newCollections);
    setActiveCollectionId(chosenCollectionId);
    callback(chosenCollectionId, collections);
  };

  useEffect(() => {
    if (collections.length) {
      if (collectionId) {
        handleCollectionClick(Number(collectionId))();
      }
    }
  }, []);

  useEffect(() => {
    reset(
      {
        collectionId: activeCollectionId,
      },
      {
        keepValues: true,
      }
    );
  }, [activeCollectionId]);

  return (
    <AccordionItem
      title={header}
      defaultOpen
      size={size}
      color={color}
      className={styles['accordion']}
    >
      <div className={styles['collection-select-wrapper']}>
        {/* <div className={styles['collection-select-search']}>
        <Search handleChange={handleChange} searchValue={searchValue} />
      </div> */}
        <div className={styles['select-stub']}>
          <div className={styles['collection-dropdown-wrapper']}>
            {searchCollections.map((collection) => (
              <Option
                key={collection.id}
                id={collection.id}
                onClick={handleCollectionClick}
                isActive={collection.id === activeCollectionId}
                text={collection.name}
                imageUrl={collection.imageUrl}
              />
            ))}
          </div>
        </div>
        <input
          style={{ visibility: 'hidden' }}
          type='hidden'
          {...register('collectionId', {
            value: activeCollectionId,
          })}
        ></input>
      </div>
    </AccordionItem>
  );
};
