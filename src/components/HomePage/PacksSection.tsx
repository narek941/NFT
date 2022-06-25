import React from 'react';
import classNames from 'classnames';
import Container from '@components/shared/Container';
import Section from '@components/shared/Section';

import styles from './HomePage.module.scss';

import { packs } from 'src/__mocks__/packSubscribe';
import { IPackItem } from '@type/general';
import PacksListSubScribe from '@components/PacksSubscribe';

export const PacksSection = () => {
  const onCardClick = (pack: IPackItem) =>
    console.log('pack is clicked: ', pack);
  const onButtonClick = (pack: IPackItem) =>
    console.log('pack button is clicked: ', pack);

  return (
    <Section color='light'>
      <Container className={styles.packs}>
        <div className={classNames(styles.header, styles['header-packs'])}>
          <h2>Packs</h2>
        </div>
        <div className={classNames(styles.desc, styles['desc-packs'])}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </div>
        <PacksListSubScribe
          packs={packs}
          onCardClick={onCardClick}
          onBuyPack={onButtonClick}
        />
      </Container>
    </Section>
  );
};
