import React, { useState } from 'react';
import {
  FieldError,
  FieldPath,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadFileSchema, validationSchema } from './validationSchema';
import {
  ChangeSourse,
  INotification,
  IUpdateEmailPayload,
  Settings,
} from '../../common/models/user';
import {
  setNotificationRequest,
  updatePasswordRequest,
  updateUserInfoRequest,
  updateUserPhotoRequest,
  updateEmailRequest,
  userInfoRequest,
  clearUserError,
} from '@entities/user/redux/actions';
import { useDispatch } from 'react-redux';
import {
  clearAuthError,
  twoFADisableRequest,
  twoFAEnableRequest,
} from '@entities/auth/redux/actions';
import { getBase64 } from '../../common/utils/file-utils';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import {
  getErrorType,
  parseErrorMessage,
} from '../../common/utils/parse-utils';
import { IProfileSettingsForm } from './types';

const useSettings = () => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');

  const dispatch = useAppDispatch();

  const [toggle2FA, setToggle2FA] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    trigger,
    setValue,
    setError,
    clearErrors,
  } = useForm<IProfileSettingsForm>({
    resolver: yupResolver(validationSchema),
  });

  const onTurnOff2FA = async () => {
    if (otp.length === 6) {
      setToggle2FA(!toggle2FA);
      await dispatch(twoFADisableRequest({ otp })).unwrap();
      dispatch(userInfoRequest({ source: ChangeSourse.TWOFA }));
    }
  };

  const onTurnON2FA = async () => {
    if (otp.length === 6) {
      setToggle2FA(!toggle2FA);
      await dispatch(twoFAEnableRequest({ otp })).unwrap();
      dispatch(userInfoRequest({ source: ChangeSourse.TWOFA }));
    }
  };

  const onUpdateUserPhoto = async (
    event: Event & { target: HTMLInputElement }
  ) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      try {
        const isPhotoValid = await UploadFileSchema.validate({ file });
        if (isPhotoValid) {
          const photoBase64 = await getBase64(file);
          dispatch(updateUserPhotoRequest({ file: photoBase64 }));
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  const onCloseTurnOff2FA = () => setToggle2FA(!toggle2FA);

  const onChangePassword = () => {
    trigger([
      'password.currentPassword',
      'password.password',
      'password.confirmPassword',
    ]).then((isValid) => {
      if (isValid) {
        handlePasswordUpdate();
      }
    });
  };

  const handlePasswordUpdate = () => {
    const {
      password: { password, currentPassword },
    } = getValues();
    dispatch(
      updatePasswordRequest({
        currentPassword: currentPassword,
        password: password,
      })
    );
  };

  const onChangeEmail = () => {
    trigger(['password.currentPassword', 'newEmail']).then((isValid) => {
      if (isValid) {
        handleEmailChange();
      }
    });
  };

  const handleEmailChange = () => {
    const {
      newEmail,
      password: { currentPassword },
    } = getValues();
    const updateEmailData: IUpdateEmailPayload = {
      email: newEmail,
      password: currentPassword,
    };
    if (otp) {
      updateEmailData.otp = otp;
    }
    dispatch(updateEmailRequest(updateEmailData));
  };

  const onOpenChangePassword = (event) => {
    event.stopPropagation();
    // setOpen(!open);
    setValue('validatePassword', !getValues().validatePassword);
  };

  const toggleNewEmailValidation = (e) => {
    e.stopPropagation();
    setValue('validateNewEmail', !getValues().validateNewEmail);
  };

  const onChangeProfile = () => {
    trigger([
      'notifications',
      'profile.bio',
      'profile.displayName',
      'profile.website',
      'username',
    ]).then((isValid) => {
      if (isValid) {
        onSubmit(getValues());
      }
    });
  };

  const onSubmit = (data: any) => {
    const { settings, notifications, password, ...restData } = data;
    notifications?.forEach((notification) => {
      // temporary solution , waiting for backend to update it to be an array
      dispatch(setNotificationRequest(notification));
    });
    dispatch(updateUserInfoRequest({ payload: restData }));
  };

  const onInvalid: SubmitErrorHandler<IProfileSettingsForm> = (errors) => {
    console.log('seems form is invalid: ', errors);
  };

  const otpHandler = (otp: string): void => {
    setOtp(otp);
  };

  const clearError = (
    error?: FieldError | string | null,
    field?: FieldPath<IProfileSettingsForm>
  ) => {
    if (!error) {
      return;
    }
    if (field) {
      clearErrors(field);
    }
    dispatch(clearAuthError());
    dispatch(clearUserError());
  };

  const onCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard');
  };

  const getNewEmail = () => {
    const { newEmail } = getValues();
    return newEmail;
  };

  return {
    errors,
    register,
    onChangeProfile,
    open,
    setOpen,
    toggle2FA,
    onTurnOff2FA,
    onChangePassword,
    onOpenChangePassword,
    reset,
    onCloseTurnOff2FA,
    onTurnON2FA,
    onUpdateUserPhoto,
    otpHandler,
    onCopyCode,
    onChangeEmail,
    toggleNewEmailValidation,
    otp,
    getNewEmail,
    clearError,
    setError,
  };
};

export default useSettings;
