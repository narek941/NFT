/* global JSX*/

import React from 'react';

import styles from './Navbar.module.scss';
const Navbar = () => {
  return (
    <button className={styles['navbar-toggler']}>
      <span className={styles['navbar-toggler-icon']}></span>
    </button>
  );
};
export default Navbar;
