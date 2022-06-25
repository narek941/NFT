import React, { ComponentType } from 'react';

import styles from './Avatar.module.scss';

import IconEdit from 'public/assets/img/edit.svg';
import IconNoImage from 'public/other/avatar.svg';

import { IAvatar } from '@type/general';
import classNames from 'classnames';

const NO_IMAGE_SRC = '/other/avatar.svg';
const IMAGE_IS_NOT_LOADED_SRC = '';

const Avatar: ComponentType<IAvatar> = ({
  edit,
  userName,
  nameImage,
  imgSrc,
  width,
  height,
  className,
  color,
  size,
  onUpdateUserPhoto,
  ...props
}: IAvatar) => {
  const getAvatarSrc = (): string => {
    switch (imgSrc) {
      case undefined:
        return IMAGE_IS_NOT_LOADED_SRC;
      case null:
        return NO_IMAGE_SRC;
      default:
        return imgSrc;
    }
  };

  const getAvatarClassName = (color?: string, size?: string): string => {
    return classNames(styles.avatarWrapper, className, {
      [styles['avatar-small']]: size === 's',

      [styles['avatar-large']]: size === 'l',
      [styles['primary']]: color === 'primary',
    });
  };

  const avatarClassName: string = getAvatarClassName(color, size);
  return (
    <div className={avatarClassName} {...props}>
      <div
        style={{ display: imgSrc === undefined ? 'none' : 'block' }}
        className={classNames(styles.avatarBox)}
      >
        {
          <img
            src={getAvatarSrc()}
            width={width}
            height={height}
            alt={userName}
          />
        }
      </div>
      <label>
        {edit && (
          <div className={styles.iconBox}>
            <IconEdit />
            <input
              type={'file'}
              hidden={true}
              accept='image/png, image/jpeg'
              onChange={onUpdateUserPhoto && onUpdateUserPhoto}
            />
          </div>
        )}
      </label>
    </div>
  );
};

export default Avatar;
