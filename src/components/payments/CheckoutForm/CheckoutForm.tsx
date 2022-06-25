import { SyntheticEvent, useState, FC } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Button from '@shared/Button';
import CheckBox from '@components/shared/CheckBox';
import { INFT } from '@type/nft';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CheckoutForm.module.scss';
import { renderPrice } from 'src/common/utils/parse-utils';
import { Spinner } from '@components/shared/Spinner/Spinner';
import Link from 'next/link';

interface ICheckoutForm {
  price: string;
  gasFee?: string;
  onSuccess: Function;
}

interface IForm {
  termsAccepted: boolean;
}

const CheckoutForm: FC<ICheckoutForm> = ({ price, gasFee, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isElementReady, setIsElementReady] = useState(false);

  const validationSchema = Yup.object().shape({
    termsAccepted: Yup.bool().oneOf([true], 'Accept terms is requirred'),
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
  });

  const termsAccepted = watch('termsAccepted');

  const handleSubmit = async (event: SyntheticEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    setIsLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    setIsLoading(false);

    if (!error && paymentIntent) {
      onSuccess(paymentIntent);
    }

    if (error) {
      console.log(error);
      if (error.type !== 'validation_error') {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(undefined);
      }
    } else {
      setErrorMessage(undefined);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        <PaymentElement
          className='payment-custom'
          onReady={() => {
            setIsLoading(false);
            setIsElementReady(true);
          }}
          options={{
            fields: {
              billingDetails: {
                address: {
                  postalCode: 'auto',
                },
              },
            },
          }}
        />
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        {isElementReady && (
          <div className={styles.buttons}>
            <CheckBox
              color='default'
              className={styles.checkbox}
              defaultChecked={false}
              id='termsCheckbox'
              text={
                <span className={styles.termsCheckbox}>
                  By checking this box, I agree to{' '}
                  <Link href='#'>Niftables Terms of Service</Link>
                </span>
              }
              error={errors.termsAccepted ? errors.termsAccepted : null}
              {...register('termsAccepted')}
            />
            {gasFee && (
              <div className={styles['split-price-wrapper']}>
                <div className={styles.price}>
                  <div className={styles.label}>Token Price:</div>
                  <div className={styles.amount}>${renderPrice(price)}</div>
                </div>
                <div className={styles.fee}>
                  <div className={styles.label}>Minting fee:</div>
                  <div className={styles.amount}>${renderPrice(gasFee)}</div>
                </div>
              </div>
            )}
            <div className={styles.action}>
              <div className={styles.price}>
                <div className={styles.label}>Final Price:</div>
                <div className={styles.amount}>
                  ${renderPrice(price, gasFee)}
                </div>
              </div>
              <Button
                size='m'
                color='blue'
                fillStyle={false}
                disabled={!stripe || !termsAccepted || isLoading}
              >
                Pay
              </Button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};
export default CheckoutForm;
