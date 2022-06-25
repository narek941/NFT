import React, { FC, ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Keyboard, Navigation, Mousewheel } from 'swiper';
import classNames from 'classnames';
import useSwiperRef from '@hooks/useSwiperRef';
import swiper from '@components/CarouselSwiper/CarouselSwiper.module.scss';
import { ICarouselSwiper } from '@type/general';
import { PackCard } from '@components/pack/PackCard';
export interface IArrowProps {
  className?: string;
  prevElRef: any;
  nextElRef: any;
}
const Arrows: FC<IArrowProps> = ({ className, prevElRef, nextElRef }) => {
  return (
    <div className={classNames(swiper['arrow-wrapper'], className)}>
      <button
        className={classNames(swiper['arrow-prev'], swiper.arrow)}
        ref={prevElRef}
      >
        Prev Arrow
      </button>
      <button
        className={classNames(swiper['arrow-next'], swiper.arrow)}
        ref={nextElRef}
      >
        Next Arrow
      </button>
    </div>
  );
};
export interface IHomeSlide {
  id: number;
  item: ReactElement;
}
export interface IHomeCarouselProps {
  slides: IHomeSlide[];
  className?: string;
}
const HomeCarousel: FC<IHomeCarouselProps> = ({ slides, className }) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();

  const params = {
    slidesPerView: 1,
    spaceBetween: 30,

    keyboard: {
      enabled: true,
    },
    navigation: {
      prevEl,
      nextEl,
    },
    mousewheel: {
      releaseOnEdges: true,
    },
    modules: [Keyboard, Navigation, Mousewheel],
    breakpoints: {
      540: {
        slidesPerView: 1,
      },

      640: {
        slidesPerView: 2,
      },

      990: {
        slidesPerView: 3,
      },
    },
  };
  return (
    <div className={classNames(swiper.wrapper, className)}>
      <Swiper {...params} className={swiper.carousel}>
        {slides.map((item) => {
          return <SwiperSlide key={item.id}>{item.item}</SwiperSlide>;
        })}
        <Arrows prevElRef={prevElRef} nextElRef={nextElRef} />
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
