import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './HrComponent.module.scss';
import { IHRComponent } from '@type/general';

const HrComponent: FC<IHRComponent> = ({
  color,
  className,
  height,
  ...props
}) => {
  const getHRClassName = (color, height): string => {
    const hrClass: string = classNames(styles.hr, className, {
      [styles['hr-light']]: color === 'light',
      [styles[`hr-height-${height}`]]: height === height,
    });
    return hrClass;
  };

  const hrClassName: string = getHRClassName(color, height);
  return <hr className={hrClassName} {...props} />;
};

export default HrComponent;
