import React, { useEffect } from 'react';
import styles from './TwoFactorAuthentication.module.scss';
import TextHelper from '@components/shared/TextHelper';

import list from '@styles/components/list.module.scss';

import HrComponent from '@components/shared/HrComponent';
import OTPInput from '@components/OTPInput';
import Button from '@components/shared/Button';
import IconCopy from 'public/other/icon_сopy.svg';

import QRcode from 'qrcode.react';
import { parseErrorMessage } from '@utils/parse-utils';

interface ICardBody {
  onTurnOff2FA: () => void;
  onTurnON2FA: () => void;
  otpAuthUrl?: string;
  otpHandler: (code: string) => void;
  twoFactorAuthEnabled?: boolean;
  twoFactorAuthSecret?: string | null;
  onCopyCode: (twoFactorAuthSecret: string) => void;
  authError: string | null;
  clearError: () => void;
}

const CardBody: React.FC<ICardBody> = ({
  otpAuthUrl,
  otpHandler,
  onCopyCode,
  onTurnON2FA,
  onTurnOff2FA,
  twoFactorAuthEnabled,
  twoFactorAuthSecret,
  authError,
  clearError,
}) => {
  return (
    <>
      <div className={styles.cardBody}>
        <TextHelper className={styles['textHelper-small']}>
          {!twoFactorAuthEnabled && (
            <>
              <div className={styles['textHelper-heading']}>
                How to enable 2FA:
              </div>
              <ol className={list.listNumbers}>
                <li>
                  {`If you don't have Google Authenticator app, please install it on
            your smartphone.`}
                </li>
                <li>
                  {` Open Google authenticator app on your device and tap "+" icon to add
            new profile.`}
                </li>
                <li>
                  You can scan QR code from this page with Google Authenticator.
                  Or you can copy setup key from this page and insert it to the
                  Google authenticator.
                </li>
                <li>
                  Now you see the 6-digit code next to the newly created profile
                  in Google Authenticator.
                </li>
                <li>
                  Enter this code to the Secret code field and Click Confirm.
                </li>
                <li>If entered code is valid, you will see Success message.</li>
              </ol>
              <p>
                Next times when you sign in with Niftables account, you will
                need to enter your password and a code from Google
                authenticator.
              </p>
            </>
          )}
          {twoFactorAuthEnabled && (
            <>
              <div className={styles['textHelper-heading']}>
                How to disable 2FA:
              </div>
              <ol className={list.listNumbers}>
                <li>Open the Google authenticator app</li>
                <li>
                  Check 6-digit code and enter into the Secret code field below
                </li>
                <li>Click Confirm.</li>
                <li>
                  If 6-digit code is valid, 2FA will be disabled for your
                  account.
                </li>
              </ol>
            </>
          )}
        </TextHelper>
        {!twoFactorAuthEnabled && (
          <div className={styles['getAuth']}>
            <div className={styles['getAuth-container']}>
              <div className={styles['getAuth-title']}>QR code</div>
              <div className={styles['getAuth-box']}>
                {otpAuthUrl && <QRcode size={200} value={otpAuthUrl} />}
              </div>
            </div>
            <div className={styles['getAuth-container']}>
              <div className={styles['getAuth-title']}>Setup key</div>
              <div className={styles['setKey']}>
                <div className={styles['setKey-box']}>
                  {twoFactorAuthSecret || ''}
                </div>
                <div
                  className={styles['copy-code']}
                  onClick={async () => {
                    twoFactorAuthSecret &&
                      (await onCopyCode(twoFactorAuthSecret));
                  }}
                >
                  <IconCopy
                    width='16'
                    height='16'
                    className={styles['copy-icon']}
                  />
                  Copy key
                </div>
              </div>
            </div>
          </div>
        )}

        <HrComponent className={styles['hr-line']} height='1' />
        <div className={styles['setSecret']}>
          <div className={styles['setSecret-title']}>Secret code</div>
          <div className={styles['setSecret-box']}>
            <OTPInput
              className={styles['setSecret-OTIinput']}
              inputClassName={styles.OTIinput}
              length={6}
              autoFocus={true}
              onChangeOTP={otpHandler}
              error={authError ? parseErrorMessage(authError) : null}
              onFocusOTP={clearError}
            />
            <Button
              className={styles.button}
              size='l'
              color='blue'
              onClick={() => {
                twoFactorAuthEnabled ? onTurnOff2FA() : onTurnON2FA();
              }}
            >
              Confirm secret code
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBody;
