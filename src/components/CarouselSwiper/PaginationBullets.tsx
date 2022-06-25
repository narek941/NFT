import React, { FC } from 'react';
import classNames from 'classnames';
import swiper from './CarouselSwiper.module.scss';

export interface IPagination {
  className?: string;
  paginationRef: any;
}
const PaginationBullets: FC<IPagination> = ({ paginationRef, className }) => {
  return <div ref={paginationRef} className={classNames(className)}></div>;
};

export default PaginationBullets;
