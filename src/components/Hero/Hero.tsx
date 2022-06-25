import React from 'react';
import styles from './Hero.module.scss';
import Container from '@components/shared/Container';
import Section from '@components/shared/Section';

import HeroHeader from './HeroHeader';
import HeroImage from './HeroImage';
import HeroContent from './HeroContent';

const Hero = () => {
  const heroImage = '/assets/img/jungle/hero-image.webp';
  return (
    <Section>
      <Container className={styles.container}>
        <div className={styles.wrapper}>
          <HeroHeader header='YOUR' subHeader='NFTs' />
          <HeroImage heroImage={heroImage} />
          <HeroContent />
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
