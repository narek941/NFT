import Button from '@components/shared/Button';
import { PaymentIntent } from '@stripe/stripe-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './PaymentSuccess.module.scss';
import Tik from 'public/other/tick.svg';
import BlockButton from './../shared/BlockButton/BlockButton';

interface IPaymentSuccess {
  paymentIntent?: PaymentIntent;
  onCloseModal: () => void;
}

const PaymentSuccess: FC<IPaymentSuccess> = ({ onCloseModal }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.round}>
          <Tik className={styles.image} />
        </div>
        <div className={styles.text}>
          <div className={styles.heading}>Thank you!</div>
          Your payment was successful! <br />
          NFT minting may take several minutes to appear in your wallet.
        </div>
        <BlockButton>
          <Button
            size={'l'}
            color={'blue'}
            fullWidth
            onClick={() => {
              router.reload();
              onCloseModal();
            }}
          >
            Back to NFT’s catalog
          </Button>
          <Button
            size={'l'}
            color={'blue'}
            fillStyle
            fullWidth
            onClick={async () => await router.push('/my-profile?tab=my-nfts')}
          >
            Go to profile
          </Button>
        </BlockButton>
      </div>
    </div>
  );
};

export default PaymentSuccess;
