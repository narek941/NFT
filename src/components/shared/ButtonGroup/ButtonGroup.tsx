import React, { useState } from 'react';
import styles from './ButtonGroup.module.scss';
import { IButtonGroup } from '@type/general';
import classNames from 'classnames';

const ButtonGroup = ({ buttonGroup }: IButtonGroup) => {
  const [active, setActive] = useState<string>(buttonGroup[0].id);

  const onClick = (e) => {
    setActive(e);
  };
  return (
    <div className={styles['btn-group']}>
      {buttonGroup.map((buttonItem) => {
        const { button, id } = buttonItem;

        return (
          <div
            id={id}
            onClick={() => onClick(id)}
            className={classNames([
              styles.btnWrapper,
              active === id && styles.isActive,
            ])}
            key={id}
          >
            {button}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
