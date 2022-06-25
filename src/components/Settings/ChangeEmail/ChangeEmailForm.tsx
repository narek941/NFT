import Button from '@components/shared/Button';
import InputWithLabel from '@components/shared/InputWithLabel';
import { FC } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldPath,
  UseFormRegister,
} from 'react-hook-form';
import { IProfileSettingsForm } from '../types';
import { FIELD_LABELS } from '../validationSchema';
import styles from './ChangeEmail.module.scss';

export interface IChangeEmailForm {
  register: UseFormRegister<IProfileSettingsForm>;
  errors: FieldErrors<IProfileSettingsForm>;
  onChangeEmail: () => void;
  clearError: (
    error?: FieldError | string | null,
    field?: FieldPath<IProfileSettingsForm>
  ) => void;
}

export const ChangeEmailForm: FC<IChangeEmailForm> = ({
  register,
  errors,
  onChangeEmail,
  clearError,
}) => (
  <>
    <div className={styles.settingsRow}>
      <div className={styles.settingsColumn}>
        <InputWithLabel
          className={styles.label}
          size='m'
          labelText='Current password'
          placeholder='Enter your password'
          id='password'
          customType='password'
          onFocus={() =>
            clearError(
              errors?.password?.currentPassword,
              'password.currentPassword'
            )
          }
          error={
            errors?.password?.currentPassword && errors.password.currentPassword
          }
          {...register(FIELD_LABELS.PASSWORD.CURRENT_PASSWORD)}
        />
        <InputWithLabel
          className={styles.label}
          size='m'
          labelText='New email'
          placeholder='Enter new email'
          id='newEmail'
          customType='email'
          error={errors?.newEmail && errors.newEmail}
          onFocus={() => clearError(errors?.newEmail, 'newEmail')}
          {...register(FIELD_LABELS.NEW_EMAIL)}
        />
      </div>
    </div>
    <Button size='l' color='blue' onClick={onChangeEmail}>
      Confirm
    </Button>
  </>
);
