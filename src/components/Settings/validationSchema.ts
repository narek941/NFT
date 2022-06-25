import * as Yup from 'yup';

import {
  DISPLAYNAME_LENGTH_MIN,
  DISPLAYNAME_LENGTH_MAX,
  USERNAME_LENGTH_MIN,
  USERNAME_LENGTH_MAX,
  PASSWORD_LENGTH_MIN,
  PASSWORD_LENGTH_MAX,
  emailRegex,
  MAX_UPLOAD_PHOTO_SIZE,
  SUPPORTED_IMAGE_FORMATS,
  PASSWORD_LENGTH_MAX_256,
} from 'configure';

export const Text_Digit_Space_Empty_Regex = new RegExp(/^$|^[a-zA-Z0-9\s]+$/);
export const Text_Digit_Regex = new RegExp(/^[a-zA-Z0-9]+$/);
export const Need_Digit_Upper_Lower_Regex = new RegExp(
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
);

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('User Name is required')
    .matches(
      Text_Digit_Regex,
      'User Name must contain only digits, upper case letters, lower case letters, spaces'
    )
    .min(
      USERNAME_LENGTH_MIN,
      `User Name must be at least ${USERNAME_LENGTH_MIN} characters`
    )
    .max(
      USERNAME_LENGTH_MAX,
      `User Name must not exceed ${USERNAME_LENGTH_MAX} characters`
    ),
  email: Yup.string()
    .matches(emailRegex as any, 'Email is invalid')
    .required('Email is required')
    .email('Not verified Email'),
  newEmail: Yup.string().when('validateNewEmail', {
    is: true,
    then: Yup.string()
      .required('Email is required')
      .matches(emailRegex as any, 'Email is invalid')
      .email('Not verified Email'),
  }),
  profile: Yup.object({
    displayName: Yup.string()
      .trim()
      .matches(
        Text_Digit_Space_Empty_Regex,
        'Name must contain only digits, upper case letters, lower case letters, spaces'
      )
      .max(
        DISPLAYNAME_LENGTH_MAX,
        `Name must not exceed ${DISPLAYNAME_LENGTH_MAX} characters`
      ),
    website: Yup.string(),
    bio: Yup.string(),
  }),
  password: Yup.object({
    currentPassword: Yup.string().when('validatePassword', {
      is: true,
      then: Yup.string().required('Password is required'),
    }),
    password: Yup.string()
      .min(PASSWORD_LENGTH_MIN, 'Password must be at least 8 characters')
      .max(
        PASSWORD_LENGTH_MAX_256,
        'Password should be less than 256 characters'
      )
      .matches(
        Need_Digit_Upper_Lower_Regex,
        'Password must contain at least one digit, uppercase and lowercase letter'
      )
      .when('validatePassword', {
        is: true,
        then: Yup.string().required('Password is required'),
      })
      .not([Yup.ref('currentPassword')], 'New password should be different'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .when('validatePassword', {
        is: true,
        then: Yup.string().required('Password is required'),
      }),
  }),
});

export const UploadFileSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('You need to provide an image')
    .test(
      'fileSize',
      'File size is too big. Max size is 20MB.',
      (value) =>
        value &&
        Number((value.size / 1024 / 1024).toFixed(2)) <= MAX_UPLOAD_PHOTO_SIZE
    )
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg and .png',
      (value) => {
        return value && SUPPORTED_IMAGE_FORMATS.includes(value.type);
      }
    ),
});

const PROFILE_LABELS: Record<string, any> = {
  DISPLAY_NAME: 'profile.displayName',
  WEBSITE: 'profile.website',
  BIO: 'profile.bio',
  PHOTO: 'profile.photo',
};

export const FIELD_LABELS: Record<string, any> = {
  ROLE: 'role',
  USERNAME: 'username',
  EMAIL: 'email',
  NEW_EMAIL: 'newEmail',
  STATUS: 'status',
  PROFILE: PROFILE_LABELS,
  PASSWORD: {
    CURRENT_PASSWORD: 'password.currentPassword',
    PASSWORD: 'password.password',
    CONFIRM_PASSWORD: 'password.confirmPassword',
  },
};
