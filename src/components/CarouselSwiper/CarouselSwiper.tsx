import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Keyboard, Navigation, Pagination, Mousewheel } from 'swiper';
import classNames from 'classnames';
import useSwiperRef from '@hooks/useSwiperRef';
import swiper from './CarouselSwiper.module.scss';
import { ICarouselSwiper } from '@type/general';
import Arrows from './Arrows';
import PaginationBullets from './PaginationBullets';

const CarouselSwiper: FC<ICarouselSwiper> = ({ children, className }) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  const [pagination, paginationRef] = useSwiperRef<HTMLDivElement>();

  const params = {
    spaceBetween: 7.7,

    keyboard: {
      enabled: true,
    },
    navigation: {
      prevEl,
      nextEl,
    },
    pagination: {
      clickable: true,
      el: pagination,
      bulletActiveClass: `${swiper.isActive}`,
      bulletClass: `${swiper['pagination-bullet']}`,
    },
    mousewheel: true,
    modules: [Keyboard, Pagination, Navigation, Mousewheel],
  };

  return (
    <div className={classNames(swiper.wrapper, className)}>
      <Swiper {...params} className={swiper.carousel} slidesPerView='auto'>
        {children}
        <Arrows prevElRef={prevElRef} nextElRef={nextElRef} />
        <PaginationBullets
          paginationRef={paginationRef}
          className={swiper['pagination-bullets']}
        />
      </Swiper>
    </div>
  );
};

export default CarouselSwiper;
