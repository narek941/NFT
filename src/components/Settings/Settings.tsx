import React, { ComponentType, useEffect, useMemo, useState } from 'react';
import { NavTabs } from '@components/Nav';
import useSettings from './useSettings';
import styles from './Settings.module.scss';
import { IUser } from '../../common/models/user';
import UserSettings from '@components/Settings/UserSettings';
import { settingsNav, SettingTab } from './constants';
import NotificationTab from './NotificationTab';
import SettingsTab from './SettingTab';
import { useRouter } from 'next/router';

interface SettingsProps {
  user: IUser;
}

const SettingsComponent: ComponentType<SettingsProps> = ({ user }) => {
  const router = useRouter();

  const { onUpdateUserPhoto } = useSettings();

  const initialActiveTab = useMemo(
    () =>
      settingsNav.find((el) => {
        return el.linkTo === router.query.tab;
      })?.id,
    [settingsNav, router.query.tab]
  );

  const [activeTab, setActiveTab] = useState<string | number>(
    initialActiveTab || 0
  );

  useEffect(() => {
    if (initialActiveTab)
      if (Number(activeTab) !== Number(initialActiveTab)) {
        setActiveTab(Number(initialActiveTab));
      }
  }, [initialActiveTab]);

  const tabs = settingsNav.map((item) => {
    const modifiedItem = { ...item };

    switch (item.contentId) {
      case SettingTab.MY_SETTINGS:
        modifiedItem.content = <SettingsTab user={user} />;
        break;
      case SettingTab.MY_NOTIFICATIONS:
        modifiedItem.content = <NotificationTab />;
        break;
      default:
        break;
    }

    return modifiedItem;
  });

  return (
    <>
      <UserSettings
        className={styles.userSettings}
        imgSrc={user.photo ? `data:image/png;base64,${user.photo}` : user.photo}
        name={user.profile?.displayName || user.email}
        userName={`@${user.username}`}
        edit={true}
        onUpdateUserPhoto={onUpdateUserPhoto}
      />
      <div className={styles.navWrapper}>
        <NavTabs
          gap='l'
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className={styles.navTabs}
        />
      </div>
    </>
  );
};

export default SettingsComponent;
