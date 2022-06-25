import React, { ReactNode } from 'react';
import styles from './NotificationsSettings.module.scss';
interface INotifications {
  notification: {
    title: string;
    description: ReactNode | string;
    options: ReactNode | string;
  };
}

const NotificationsSettings = ({ notification }: INotifications) => {
  const { title, description, options } = notification;

  return (
    <>
      <div className={styles.cardSettings}>
        <div className={styles.cardBody}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardText}>{description}</div>
        </div>
        <div className={styles.cardFooter}>{options}</div>
      </div>
    </>
  );
};

export default NotificationsSettings;
