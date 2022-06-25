import { FC } from 'react';
import styles from './Arrows.module.scss';
import classNames from 'classnames';

export interface IArrowProps {
  onArrowClick: () => void;
  className?: string;
}
export const ArrowRight: FC<IArrowProps> = ({ onArrowClick, className }) => {
  const arrowClass: string = classNames(
    styles['arrow-next'],
    styles.arrow,
    className
  );

  return (
    <div className={arrowClass} onClick={onArrowClick}>
      &gt;
    </div>
  );
};

export const ArrowLeft: FC<IArrowProps> = ({ onArrowClick, className }) => {
  const arrowClass: string = classNames(
    styles['arrow-prev'],
    styles.arrow,
    className
  );
  return (
    <div className={arrowClass} onClick={onArrowClick}>
      &gt;
    </div>
  );
};
