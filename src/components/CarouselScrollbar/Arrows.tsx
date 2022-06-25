import React, { FC } from 'react';
import classNames from 'classnames';

import swiper from './CarouselScrollbar.module.scss';

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

export default Arrows;
