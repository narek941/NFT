import React, { FC, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';

import WarningHint from '@components/shared/WarningHint';
import BuyOrSigninButton from '@components/shared/BuyOrSigninButton';
import styles from './DetailViewInfo.styles.module.scss';
import Button from '@shared/Button';

const showBuyBtnPages = ['/buy', '/packs', '/collection/[id]', '/my-profile'];

export interface IBuyButtonProps {
  availableSupply: number;
  distribution?: string;
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  collectionId?: number;
}

const BuyButton: FC<IBuyButtonProps> = ({
  availableSupply,
  distribution,
  onClick,
  collectionId,
}) => {
  const router = useRouter();

  if (availableSupply === 0) return null;
  if (!showBuyBtnPages.includes(router.pathname)) return null;
  // if (distribution === 'PACKS') return null;

  return (
    <>
      <div className={styles.actions}>
        {/*if Packs we should redirect to packs page*/}
        {distribution === 'PACKS' ? (
          <Button
            size={'s'}
            color={'blue'}
            onClick={async () => await router.push('/packs')}
          >
            View Packs
          </Button>
        ) : (
          <BuyOrSigninButton onClick={onClick} />
        )}
      </div>

      <WarningHint collectionId={collectionId} />
    </>
  );
};

export default BuyButton;
