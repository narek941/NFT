/* global JSX*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { twoFAEnableRequest } from '@entities/auth/redux/actions';
import OTPBlock from '@components/OTPBlock';

function enable2Fa(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const { twoFactorAuthEnabled } = useTypedSelector((state) => state.auth);
  const { user } = useTypedSelector((state) => state.user);

  const [error, setError] = useState<string>('');
  const [otp, setOtp] = useState('');

  function otpHandler(otp: string): void {
    setError('');
    setOtp(otp);
  }

  function btnClickHandler() {
    dispatch(twoFAEnableRequest({ otp }));
  }

  useEffect(() => {
    if (twoFactorAuthEnabled) router.replace('/profile/2fa');
  }, [twoFactorAuthEnabled]);

  return (
    <>
      <OTPBlock
        user={user}
        blockTitle='Enable 2FA'
        error={error}
        otpHandler={otpHandler}
        btnClickHandler={btnClickHandler}
      />
    </>
  );
}

export default enable2Fa;
