import React, { FC, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';

import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { AbilityToBuyValues } from '@type/restriction';
import { isLoggedIn, user2FAPassed } from 'src/common/utils/token';
import Button from '@components/shared/Button';
import styles from './BuyOrSignin.module.scss';

export interface IBuyOrSigninProps {
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const BuyOrSigninButton: FC<IBuyOrSigninProps> = ({ onClick }) => {
  const router = useRouter();
  const isAbilityToBuy = useTypedSelector((state) => {
    return state.nftCollection.abilityToBuy === AbilityToBuyValues.SUCCESS;
  });

  if (isLoggedIn() && user2FAPassed()) {
    return (
      <Button
        className={styles['details-btn-buy']}
        size={'s'}
        color={'blue'}
        disabled={!isAbilityToBuy}
        onClick={onClick}
      >
        Buy Now
      </Button>
    );
  }
  return (
    <Button
      size={'s'}
      color={'blue'}
      onClick={async () => await router.push('/signin')}
    >
      Sign in to buy
    </Button>
  );
};

export default BuyOrSigninButton;
