import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import QRcode from 'qrcode.react';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { twoFASetupRequest } from '@entities/auth/redux/actions';
import ModalTitle from '@shared/ModalTitle';
import Button from '@shared/Button';
import { useDispatch } from 'react-redux';
import { Spinner } from '@components/shared/Spinner/Spinner';
import { isServer } from 'src/common/utils/common';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    twoFactorAuthEnabled,
    userType,
    twoFactorAuthSecret,
    otpAuthUrl,
    pending,
  } = useTypedSelector((state) => state.auth);

  const qrCode = otpAuthUrl;
  const secret = twoFactorAuthSecret;

  if (userType !== 'authorized' && !isServer) {
    router.replace('/signin');
  }

  const [btnText, setBtntext] = useState<string>('Enable');

  const setup2faHandler = () => {
    if (secret && qrCode) return;
    dispatch(twoFASetupRequest({}));
  };

  const switch2FaHandler = () => {
    if (btnText === 'Enable') router.push('/profile/2fa/enable');
    if (btnText === 'Disable') router.push('/profile/2fa/disable');
    router;
  };

  useEffect(() => {
    if (typeof twoFactorAuthEnabled === 'undefined') return;
    if (!twoFactorAuthEnabled) setBtntext('Enable');
    if (twoFactorAuthEnabled) setBtntext('Disable');
  }, [twoFactorAuthEnabled]);

  return (
    <>
      <ModalTitle text={'Setup 2FA for your account'} />
      {pending && <Spinner />}
      {qrCode && (
        <>
          <p>Scan QR code below using Google Authenticator App</p>
          <QRcode value={qrCode} />
        </>
      )}
      {secret && <p>Secret: {secret}</p>}
      {!twoFactorAuthEnabled && (
        <Button
          size='m'
          color='blue'
          fillStyle={false}
          fullWidth={false}
          onClick={setup2faHandler}
        >
          Setup 2FA
        </Button>
      )}

      <Button
        size='m'
        color='blue'
        fillStyle={false}
        fullWidth={false}
        onClick={switch2FaHandler}
      >
        {btnText}
      </Button>
    </>
  );
};

export default Profile;
