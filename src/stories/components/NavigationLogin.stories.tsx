import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavigationLogin } from '@components/navigation/navigationLogin';

export default {
  title: 'Components/NavigationLogin',
  component: NavigationLogin,
} as ComponentMeta<typeof NavigationLogin>;

const Template: ComponentStory<typeof NavigationLogin> = (args) => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <NavigationLogin />
    </div>
  );
};

export const DemoNavigationLogin = Template.bind({});
DemoNavigationLogin.args = {};
