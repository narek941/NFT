import OTPInput from '@components/OTPInput';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { getConflictField, parseErrorMessage } from '@utils/parse-utils';
import { FC } from 'react';
import useSettings from '../useSettings';
import styles from './ChangeEmail.module.scss';

export interface ISecret {
  otpHandler: (otp: string) => void;
  clearError: (authError?: string | null | undefined) => void;
}

export const Secret: FC<ISecret> = ({ otpHandler, clearError }) => {
  const { error: userError } = useTypedSelector((state) => state.user);
  const showError = userError && getConflictField(userError) === 'otp';

  return (
    <div className={styles['setSecret']}>
      <div className={styles['setSecret-title']}>Secret code</div>
      <div className={styles['setSecret-box']}>
        <OTPInput
          className={styles['setSecret-OTIinput']}
          inputClassName={styles.OTIinput}
          length={6}
          autoFocus={true}
          onChangeOTP={otpHandler}
          error={showError ? parseErrorMessage(userError) : null}
          onFocusOTP={clearError}
        />
      </div>
    </div>
  );
};
