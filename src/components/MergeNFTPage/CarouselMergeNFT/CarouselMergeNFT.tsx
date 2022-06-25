import { CardSmall } from '@components/CardSmall';
import CarouselScrollbarFull from '@components/CarouselScrollbarFull';
import GetNewNFT from '../GetNewNFT';
import { SwiperSlide } from 'swiper/react';

import styles from './CarouselMergeNFT.module.scss';
import { ICardItem } from '@components/CardSmall/CardSmall';

const showCollectionNFTs = () => {
  console.log('test');
};

const CarouselMergeNFT = ({ collections, onClickMerge }) => {
  return (
    <CarouselScrollbarFull className={styles.carousel}>
      {collections.map((collection) => {
        const item: ICardItem = {
          id: collection.id,
          name: collection.name,
          price: '41841.79',
          imageUrl: collection.imageUrl,
        };
        return (
          <SwiperSlide className={styles.slide} key={collection.id}>
            <CardSmall
              imageHeight='100%'
              imageWidth='100%'
              className={styles['card-item']}
              item={item}
              onClick={showCollectionNFTs}
            />
          </SwiperSlide>
        );
      })}
      <GetNewNFT onClickMerge={onClickMerge} className={styles.getNewNFT} />
    </CarouselScrollbarFull>
  );
};

export default CarouselMergeNFT;
