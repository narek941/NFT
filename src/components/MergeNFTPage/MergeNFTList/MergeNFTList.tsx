import React from 'react';
import Container from '@components/shared/Container';
import styles from './MergeNFTList.module.scss';
import { CardSmall } from '@components/CardSmall';
import { ICardItem } from '@components/CardSmall/CardSmall';

const MergeNFTList = ({ list, onClickCard }) => {
  return (
    <Container className={styles.list}>
      {list.map((collection) => {
        const item: ICardItem = {
          id: collection.id,
          name: collection.name,
          price: '41841.79',
          imageUrl: collection.imageUrl,
        };
        return (
          <CardSmall
            isMedium
            key={item.id}
            imageHeight='100%'
            imageWidth='100%'
            className={styles['card-item']}
            item={item}
            onClick={onClickCard}
          />
        );
      })}
    </Container>
  );
};

export default MergeNFTList;
