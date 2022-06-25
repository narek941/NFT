import Container from '@components/shared/Container';
import styles from './HomePage.module.scss';

import Section from '@components/shared/Section';
import React from 'react';
import HrComponent from '@components/shared/HrComponent';
import classNames from 'classnames';

export const AboutSection = () => {
  return (
    <Section>
      <HrComponent height='1' color='light' />
      <Container className={styles['about-us']}>
        <div className={classNames(styles.header, styles['header-myNfts'])}>
          <h2>My NFTs</h2>
        </div>
        <div className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia .
        </div>
      </Container>
    </Section>
  );
};
