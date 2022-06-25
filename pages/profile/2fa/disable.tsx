/* global JSX*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { twoFADisableRequest } from '@entities/auth/redux/actions';
import OTPBlock from '@components/OTPBlock';

function enable2Fa(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { twoFactorAuthEnabled } = useTypedSelector((state) => state.auth);

  const [error, setError] = useState<string>('');
  const [otp, setOtp] = useState('');

  function otpHandler(otp: string): void {
    setError('');
    setOtp(otp);
  }

  function btnClickHandler() {
    dispatch(twoFADisableRequest({ otp }));
  }

  useEffect(() => {
    if (!twoFactorAuthEnabled) router.replace('/profile/2fa');
  }, [twoFactorAuthEnabled]);

  const { user } = useTypedSelector((state) => state.user);

  return (
    <>
      <OTPBlock
        blockTitle='Disable 2FA'
        error={error}
        otpHandler={otpHandler}
        btnClickHandler={btnClickHandler}
        user={user}
      />
    </>
  );
}

export default enable2Fa;
