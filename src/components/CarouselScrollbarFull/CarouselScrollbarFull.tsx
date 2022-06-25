import React, { FC } from 'react';
import { Swiper } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Mousewheel } from 'swiper';

import classNames from 'classnames';
import useSwiperRef from '@hooks/useSwiperRef';

import swiper from './CarouselScrollbarFull.module.scss';
import { ICarouselScrollbar } from '@type/general';
import Arrows from './Arrows';
import ScrollBar from './ScrollBar';

const CarouselScrollbarFull: FC<ICarouselScrollbar> = ({
  children,
  className,
}) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  const [scrollbarEl, scrollbarRef] = useSwiperRef<HTMLDivElement>();

  const params = {
    spaceBetween: 20,

    keyboard: {
      enabled: true,
    },
    scrollbar: {
      draggable: true,
      el: scrollbarEl,
      dragClass: `${swiper['scrollbar-drag']}`,
    },
    navigation: {
      prevEl,
      nextEl,
    },
    mousewheel: true,
    modules: [Keyboard, Scrollbar, Navigation, Mousewheel],
  };

  return (
    <div className={classNames(swiper.wrapper, className)}>
      <Swiper
        {...params}
        className={classNames(swiper.carousel)}
        slidesPerView='auto'
      >
        {children}
        <Arrows
          prevElRef={prevElRef}
          nextElRef={nextElRef}
          className={swiper['arrow-wrapper']}
        />
        <ScrollBar scrollbarRef={scrollbarRef} />
      </Swiper>
    </div>
  );
};

export default CarouselScrollbarFull;
