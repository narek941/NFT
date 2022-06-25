import { FC } from 'react';
import cn from 'classnames';
import styles from './Dots.module.scss';
import classNames from 'classnames';

export interface IDotsProps {
  dotsTotal: number;
  activeDot: number;
  className?: string;
  onDotClick: (id: number) => void;
}

interface IDot {
  id: number;
  isActive: boolean;
  onDotClick: (id: number) => void;
}

const Dot: FC<IDot> = ({ id, isActive, onDotClick }) => (
  <div
    className={cn(styles.dot, {
      [styles['dot-active']]: isActive,
    })}
    onClick={() => onDotClick(id)}
  ></div>
);

export const Dots: FC<IDotsProps> = ({
  dotsTotal,
  activeDot,
  onDotClick,
  className,
}) => {
  const getDotsClassClassName = (): string => {
    const dotsClass: string = classNames(styles.wrapper, className);
    return dotsClass;
  };

  const dotsClassClassName: string = getDotsClassClassName();
  return (
    <div className={dotsClassClassName}>
      {Array(dotsTotal)
        .fill(undefined)
        .map((item, index) => (
          <Dot
            key={index}
            id={index}
            isActive={activeDot === index}
            onDotClick={onDotClick}
          />
        ))}
    </div>
  );
};
