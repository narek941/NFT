import React, { FC } from 'react';
import classNames from 'classnames';

import swiper from './CarouselScrollbar.module.scss';

export interface IScrollBar {
  className?: string;
  scrollbarRef: any;
}
const ScrollBar: FC<IScrollBar> = ({ className, scrollbarRef }) => {
  return (
    <div className={classNames(swiper['scrollbar-wrapper'], className)}>
      <div ref={scrollbarRef} className={swiper.scrollbar}></div>
    </div>
  );
};

export default ScrollBar;
