import React, { FC, ReactNode } from 'react';
import ToggleSwitch from '@components/shared/ToggleSwitch';
import styles from './ToggleSwitchFilter.module.scss';
import { UseFormRegister } from 'react-hook-form';
export interface IToggleSwitchFilter {
  header?: string;
  title?: ReactNode | string;
  id: string;
  name: string;
  register: UseFormRegister<any>;
}
const ToggleSwitchFilter: FC<IToggleSwitchFilter> = ({
  header,
  title,
  id,
  name,
  register,
}) => {
  return (
    <div className={styles.wrapper}>
      {header && <div className={styles.header}>{header}</div>}

      <ToggleSwitch
        id={id}
        name={name}
        register={register}
        text={title}
        error={null}
      />
    </div>
  );
};

export default ToggleSwitchFilter;
