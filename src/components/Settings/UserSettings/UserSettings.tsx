import React from 'react';
import UserNameLabel from '@components/UserNameLabel';
import Avatar from '@shared/Avatar';
import PageHeader from '@shared/PageHeader';
import styles from './UserSettings.module.scss';
import classNames from 'classnames';

const UserSettings = ({
  imgSrc,
  name,
  userName,
  edit,
  onUpdateUserPhoto,
  className,
}) => {
  return (
    <div className={classNames(styles.userSettings, className)}>
      <Avatar
        edit={edit}
        nameImage={name}
        imgSrc={imgSrc}
        width={100}
        height={100}
        size='l'
        onUpdateUserPhoto={onUpdateUserPhoto}
      />
      <PageHeader className={styles.heading}>{name}</PageHeader>
      <UserNameLabel>{userName}</UserNameLabel>
    </div>
  );
};

export default UserSettings;
