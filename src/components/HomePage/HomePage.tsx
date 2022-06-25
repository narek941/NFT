import React, { useEffect, useState } from 'react';

import Hero from '@components/Hero';

import { AboutSection } from '@components/HomePage/AboutSection';
import { NewsSection } from '@components/HomePage/NewsSection';
import { PacksSection } from '@components/HomePage/PacksSection';

import { PackCard } from '@components/pack/PackCard';
import { packs } from 'src/__mocks__/packs';

import { IPack } from 'src/common/models/pack';
import styles from '@components/pack/PackCard/PackCard.module.scss';
import homeStyle from './HomePage.module.scss';
import NextHead from '@components/Head';

const HomePage = ({ userType }) => {
  const onButtonClick = (pack: IPack) =>
    console.log('pack button is clicked: ', pack);

  const [isDetailPopupShown, toggleDetailPopup] = useState(false);
  const [chosenPack, setChosenPack] = useState<IPack | undefined>(undefined);

  const onCardClick = (pack: IPack) => {
    setChosenPack(pack);
    toggleDetailPopup(true);
  };
  const slides = [
    {
      id: 0,
      item: (
        <PackCard
          className={styles.home}
          key={0}
          item={packs[0]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 1,
      item: (
        <PackCard
          className={styles.home}
          key={1}
          item={packs[1]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 2,
      item: (
        <PackCard
          className={styles.home}
          key={2}
          item={packs[2]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 3,
      item: (
        <PackCard
          className={styles.home}
          key={3}
          item={packs[3]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 4,
      item: (
        <PackCard
          className={styles.home}
          key={4}
          item={packs[4]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 5,
      item: (
        <PackCard
          className={styles.home}
          key={5}
          item={packs[5]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 6,
      item: (
        <PackCard
          className={styles.home}
          key={6}
          item={packs[6]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 7,
      item: (
        <PackCard
          className={styles.home}
          key={7}
          item={packs[7]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
  ];

  return (
    <>
      <NextHead title='Home | Niftables' description='Home | Niftables' />
      <div className={homeStyle['home-page']}>
        <Hero />
        <AboutSection />
        <NewsSection
          slides={slides}
          onCardClick={onCardClick}
          chosenPack={chosenPack}
          isDetailPopupShown={isDetailPopupShown}
          toggleDetailPopup={toggleDetailPopup}
          setChosenPack={setChosenPack}
        />
        <PacksSection />
      </div>
    </>
  );
};

export default HomePage;
