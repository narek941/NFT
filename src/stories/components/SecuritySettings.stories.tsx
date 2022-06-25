import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SecuritySettings from '@components/Settings/SecuritySettings';
import Button from '@components/shared/Button';

export default {
  title: 'Components/SecuritySettings',
  component: SecuritySettings,
} as ComponentMeta<typeof SecuritySettings>;

const Template: ComponentStory<typeof SecuritySettings> = (args) => (
  <SecuritySettings {...args} />
);

export const DefaultSecuritySettings = Template.bind({});
DefaultSecuritySettings.args = {
  security: {
    title: 'Password',
    description: `When you receive and NFT or NFT pack from your
		subscriptions.`,
    options: (
      <>
        <Button
          color='blue'
          size='s'
          space='m-0'
          onClick={() => {
            console.log('onOpenChangePassword');
          }}
        >
          Change password
        </Button>
      </>
    ),
  },
};
