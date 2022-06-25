import { IPack } from 'src/common/models/pack';
import styles from './PayByCard.module.scss';
import btnStyles from '@components/shared/Button/Button.module.scss';
import Placeholder from '/public/assets/img/img-placeholder.svg';
import { ExternalImage } from '@components/shared/ExternalImage';
import { FC, useEffect, useState } from 'react';
import Button from '@components/shared/Button';
import ArrowRight from '/public/field-icons/arrow-right.svg';
import CheckoutForm from '@components/payments/CheckoutForm';
import { loadStripe, PaymentIntent } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripeOptions } from '@components/nft/NFTDetail/PaymentView/PaymentView.constants';
import PaymentsService, {
  ICreatePaymentPayload,
  ReferenceValues,
} from '@services/PaymentsService';

export interface IPayByCardProps {
  pack: IPack;
  goBack: () => void;
  onSuccess: (paymentIntent: PaymentIntent) => void;
}

export const PayByCard: FC<IPayByCardProps> = ({ pack, goBack, onSuccess }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_KEY as string,
    {
      locale: 'en',
    }
  );
  const options = stripeOptions;
  const [clientSecret, setClientSecret] = useState<string | undefined>();

  useEffect(() => {
    const payload: ICreatePaymentPayload = {
      reference: ReferenceValues.packs,
      referenceId: pack.id,
      currency: 'USD',
      type: 'STRIPE',
    };
    PaymentsService.createPayment(payload).then(({ clientSecret }) => {
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className={styles.general}>
      <div className={styles.main}>
        <div className={styles['media-block']}>
          <div className={styles.media}>
            {(pack.imageUrl && (
              <ExternalImage src={pack.imageUrl} attachPreview />
            )) || <Placeholder />}
          </div>
          <Button
            size={'m'}
            color={'blue'}
            fullWidth
            className={btnStyles['btn-back']}
            onClick={goBack}
          >
            <div className={styles['back-button-text']}>
              <span>
                <ArrowRight />
              </span>
              Back to pack detais
            </div>
          </Button>
        </div>

        <div className={styles['info-block']}>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ ...options, clientSecret }}
            >
              <CheckoutForm price={pack.price} onSuccess={onSuccess} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};
