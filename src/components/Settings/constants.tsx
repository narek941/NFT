export enum SettingTab {
  MY_SETTINGS = 0,
  MY_NOTIFICATIONS = 1,
}
export enum SettingTabLink {
  MY_SETTINGS = 'setting',
  MY_NOTIFICATIONS = 'notification',
}

export const settingsNav = [
  {
    id: 0,
    contentId: SettingTab.MY_SETTINGS,
    name: `Settings`,
    linkTo: SettingTabLink.MY_SETTINGS,
    content: <div>My settings</div>,
  },
  {
    id: 1,
    contentId: SettingTab.MY_NOTIFICATIONS,
    name: `Notifications`,
    linkTo: SettingTabLink.MY_NOTIFICATIONS,
    content: <div>My notification</div>,
  },
];
export const defaultParams = {
  skip: 0,
  take: 2,
  sort: 'id',
  order: 'DESC',
};
