import React, { useState, ReactNode } from 'react';

import styles from './SecuritySettings.module.scss';

interface ISecurity {
  security: {
    title: string;
    description: ReactNode | string;
    options: ReactNode | string;
  };
}

const SecuritySettings = ({ security }: ISecurity) => {
  const { title, description, options } = security;
  return (
    <>
      <div className={styles.cardSettings}>
        <div className={styles.cardBody}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardText}>{description}</div>
          <div className={styles.cardFooter}>{options}</div>
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;
