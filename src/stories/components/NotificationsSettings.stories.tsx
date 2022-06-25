import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NotificationsSettings from '@components/Settings/NotificationsSettings';

export default {
  title: 'Components/NotificationsSettings',
  component: NotificationsSettings,
} as ComponentMeta<typeof NotificationsSettings>;

const Template: ComponentStory<typeof NotificationsSettings> = (args) => (
  <NotificationsSettings {...args} />
);

export const DefaultNotificationsSettings = Template.bind({});
DefaultNotificationsSettings.args = {
  notification: {
    title: 'Subscriptions',
    description: `When you receive and NFT or NFT pack from your
		subscriptions.`,
    options: (
      <>
        <span>Email</span>
        <span>Platform</span>
      </>
    ),
  },
};
