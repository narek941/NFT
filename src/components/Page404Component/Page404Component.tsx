import React from 'react';
import Container from '@components/shared/Container';
import NavButton from '@components/shared/NavButton';

import styles from './Page404.module.scss';

const Page404Component = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.inner}>
        <h1>404</h1>
        <div className={styles.header}>We are sorry...</div>
        <p>The page you are looking for could not be found.</p>
        <NavButton
          className={styles.button}
          to='/'
          size='l'
          color='blue'
          fillStyle={false}
          fullWidth={false}
        >
          Go back to the home page
        </NavButton>
      </div>
    </Container>
  );
};

export default Page404Component;
