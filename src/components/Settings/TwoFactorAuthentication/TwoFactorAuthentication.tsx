import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './TwoFactorAuthentication.module.scss';
import { dateParse } from '../../../common/utils/date-utils';
import list from '@styles/components/list.module.scss';
import IconNotDisturb from 'public/other/not_disturb.svg';
import IconCheckCircle from 'public/other/check_circle.svg';
import Button from '@components/shared/Button';
import btnStyles from '@components/shared/Button/Button.module.scss';
import useSettings from '../useSettings';
import { twoFASetupRequest } from '@entities/auth/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useDispatch } from 'react-redux';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { toast } from 'react-toastify';
import { parseErrorMessage } from '../../../common/utils/parse-utils';
import CardBody from './CardBody';

const TwoFactorAuthentication = ({ user }) => {
  const { otpHandler, onCopyCode, onTurnON2FA, onTurnOff2FA, clearError } =
    useSettings();
  const [open, setOpen] = useState<boolean>(false);

  const {
    twoFactorAuthEnabled,
    twoFactorAuthSecret,
    otpAuthUrl,
    pending,
    error: authError,
  } = useTypedSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toggleText = twoFactorAuthEnabled ? 'ON' : 'OFF';

  useNoInitialEffect(() => {
    if (!authError && !pending) {
      setOpen(false);
    }
  }, [twoFactorAuthEnabled]);

  useEffect(() => {
    if (open) {
      if (twoFactorAuthSecret && otpAuthUrl) return;
      dispatch(twoFASetupRequest({}));
    }
  }, [open]);

  const onOpenAuthSecurity = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <div className={styles.cardSettings}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Two-factor authentication</div>
        <ul className={classNames(list.listIcon, styles.listIcon)}>
          <li>
            {user.settings?.twoFactorAuthEnabled ? (
              <IconCheckCircle className={list.icon} />
            ) : (
              <IconNotDisturb className={list.icon} />
            )}
            <div className={list.listText}>
              {toggleText} since{' '}
              {dateParse(user.settings?.updatedAt, 'MMM d, yyyy')}
            </div>
          </li>
        </ul>
        <div className={classNames({ [styles.btn_wrapper]: open })}>
          {open ? (
            <Button
              className={classNames('mt-0', btnStyles['btn-cancel'])}
              onClick={onOpenAuthSecurity}
              size='s'
              color={'blue'}
              fillStyle
            >
              Cancel
            </Button>
          ) : (
            <Button
              className='mt-0'
              onClick={onOpenAuthSecurity}
              size='s'
              color='blue'
            >
              {twoFactorAuthEnabled ? 'Turn off 2FA' : 'Turn on 2FA'}
            </Button>
          )}
        </div>
      </div>
      {open && (
        <CardBody
          otpAuthUrl={otpAuthUrl}
          otpHandler={otpHandler}
          onCopyCode={onCopyCode}
          onTurnON2FA={onTurnON2FA}
          onTurnOff2FA={onTurnOff2FA}
          twoFactorAuthSecret={twoFactorAuthSecret}
          twoFactorAuthEnabled={twoFactorAuthEnabled}
          authError={authError}
          clearError={clearError}
        />
      )}
    </div>
  );
};

export default TwoFactorAuthentication;
