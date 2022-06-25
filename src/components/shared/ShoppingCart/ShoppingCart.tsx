import React from 'react';
import styles from './ShoppingCart.module.scss';
import Button from '@shared/Button';
import Icon from 'public/other/user.svg';

const ShoppingCart = ({ price, onClick }) => {
  return (
    <div className={styles.cart}>
      <div className={styles['heading-small']}>Balance</div>
      <div className={styles['cart-body']}>
        <div className={styles['cart-text']}>
          <span className={styles['cart-value']}>
            <Icon className={styles['cart-icon']} width='16' height='16' /> 1000
            NFT
          </span>
          <span className={styles['cart-price']}> ({price})</span>
        </div>
      </div>
      <Button size='s' color='blue' onClick={onClick}>
        Add funds with card
      </Button>
    </div>
  );
};

export default ShoppingCart;
