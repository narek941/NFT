import { INotification, Settings } from 'src/common/models/user';

export interface IProfileSettingsForm {
  username: string;
  email: string;
  newEmail: string;
  profile: IProfile;
  notifications: INotification[];
  settings: Settings;
  status: string;
  updatedAt: Date | null;
  password: {
    currentPassword: string;
    password: string;
    confirmPassword?: string;
  };
  validatePassword: boolean;
  validateNewEmail: boolean;
}

export interface IProfile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  displayName: string;
  bio: string;
  website: string;
  photo?: any;
}
