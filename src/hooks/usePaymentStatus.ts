import { useEffect, useState } from 'react';

export const usePaymentStatus = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    const redirectStatus = new URLSearchParams(window.location.search).get(
      'redirect_status'
    );
    switch (redirectStatus) {
      case 'succeeded':
        setMessage('Success! Payment received.');
        setStatus(true);
        break;

      case 'processing':
        setMessage(
          "Payment processing. We'll update you when payment is received."
        );
        setStatus(true);
        break;

      case 'requires_payment_method':
        setMessage('Payment failed. Please try another payment method.');
        setStatus(true);
        break;

      default:
        setMessage('Something went wrong.');
        setStatus(false);
        break;
    }
  }, [status]);

  return { message, status, setStatus, setMessage };
};
