import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavigationSignUp } from '@components/navigation/navigationSignUp';

export default {
  title: 'Components/NavigationSignUp',
  component: NavigationSignUp,
} as ComponentMeta<typeof NavigationSignUp>;

const Template: ComponentStory<typeof NavigationSignUp> = (args) => {
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
      <NavigationSignUp />
    </div>
  );
};

export const DemoNavigationSignUp = Template.bind({});
DemoNavigationSignUp.args = {};
