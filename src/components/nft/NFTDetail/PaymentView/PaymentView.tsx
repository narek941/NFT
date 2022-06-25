import { INFT } from '@type/nft';
import { FC, useEffect, useState } from 'react';
import CheckoutForm from '@components/payments/CheckoutForm';
import PaymentsService, {
  ICreatePaymentPayload,
  ReferenceValues,
} from '@services/PaymentsService';
import { loadStripe, PaymentIntent } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './PaymentView.styles.module.scss';
import { stripeOptions } from './PaymentView.constants';

interface IPaymentViewProps {
  nft: INFT;
  onClick: (paymentIntent: PaymentIntent) => void;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string, {
  locale: 'en',
});

const options = stripeOptions;

export const PaymentView: FC<IPaymentViewProps> = ({ nft, onClick }) => {
  const [clientSecret, setClientSecret] = useState<string | undefined>();

  useEffect(() => {
    const payload: ICreatePaymentPayload = {
      reference: ReferenceValues.nft,
      referenceId: nft.id,
      currency: 'USD',
      type: 'STRIPE',
    };
    PaymentsService.createPayment(payload)
      .then(({ clientSecret }) => {
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        console.log('payment request failed: ', err);
      });
  }, []);
  console.log(nft);
  return (
    <div>
      <div className={styles.title}>{nft.name}</div>
      <hr className={styles['line-modal']} />
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ ...options, clientSecret }}>
          <CheckoutForm
            price={nft.price}
            gasFee={nft?.collection?.gasFee}
            onSuccess={onClick}
          />
        </Elements>
      )}
    </div>
  );
};
