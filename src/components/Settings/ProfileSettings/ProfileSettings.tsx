import React from 'react';
import InputWithLabel from '@shared/InputWithLabel';
import TextArea from '@components/shared/TextArea';
import styles from './ProfileSettings.module.scss';
import { FIELD_LABELS } from '@components/Settings/validationSchema';
const ProfileSettings = ({ errors, register }) => {
  return (
    <>
      <div className={styles.settingsRow}>
        <div className={styles.settingsColumn}>
          <InputWithLabel
            labelText='Display name'
            placeholder='Enter name '
            id='displayName'
            error={errors?.profile?.displayName && errors.profile.displayName}
            {...register(FIELD_LABELS.PROFILE.DISPLAY_NAME)}
          />
          <InputWithLabel
            labelText='Username'
            placeholder='Enter name '
            id='username'
            error={errors?.username && errors.username}
            {...register(FIELD_LABELS.USERNAME)}
          />
          <InputWithLabel
            labelText='Email'
            placeholder='Enter email'
            id='email'
            disabled
            error={errors?.email && errors.email}
            {...register(FIELD_LABELS.EMAIL)}
            type={'email'}
          />
          <InputWithLabel
            labelText='Website'
            placeholder='www.example.com'
            id='website'
            error={errors?.profile?.website && errors.profile?.website}
            {...register(FIELD_LABELS.PROFILE.WEBSITE)}
          />
        </div>
        <div className={styles.settingsColumn}>
          <TextArea
            className={styles['settings-textArea']}
            id='bio'
            {...register('profile.bio')}
            labelText='Bio'
            error={errors?.bio && errors.bio}
            placeholder='Enter your bio'
            size='l'
          />
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
