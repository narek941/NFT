import { FC, useState } from 'react';
import CheckBox from '@shared/CheckBox';
import { ICheckBox } from '@shared/CheckBox/CheckBox';

import styles from './CheckBoxGroup.styles.module.scss';
import { UseFormRegister } from 'react-hook-form';

import classNames from 'classnames';

export interface ICheckBoxGroup {
  header?: string;
  className?: string;
  checkboxArray: ICheckBox[];
  register: UseFormRegister<any>;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'default';
}

export const CheckBoxGroup: FC<ICheckBoxGroup> = ({
  header,
  checkboxArray,
  register,
  className,
  size,
  color,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const getCheckBoxGroupClassName = (size?: string): string => {
    const checkBoxGroupClass: string = classNames(
      styles['checkbox-group'],
      className,

      {
        [styles['checkbox-group-small']]: size === 's',
        [styles['checkbox-group-medium']]: size === 'm',
      }
    );
    return checkBoxGroupClass;
  };

  const checkBoxGroupClassName: string = getCheckBoxGroupClassName(size);

  const onClickSeeMore = () => {
    setShow(!show);
  };
  return (
    <>
      <div className={checkBoxGroupClassName}>
        {header && (
          <div className={styles.title}>
            <span className={styles['title-name']}>{header}</span>
          </div>
        )}
        <div
          className={classNames(styles['group-container'], show && styles.show)}
        >
          {checkboxArray.map((checkbox) => {
            return (
              <CheckBox
                color='primary'
                className={styles.checkBox}
                key={checkbox.id}
                id={checkbox.id}
                text={checkbox.text}
                error={checkbox.error}
                defaultChecked={false}
                {...register(checkbox.name)}
              />
            );
          })}
          <div
            onClick={onClickSeeMore}
            className={classNames(styles['see-more'], show && styles.show)}
          >
            {show ? 'See less' : 'See more'}
          </div>
        </div>
      </div>
    </>
  );
};
