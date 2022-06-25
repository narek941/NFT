import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import UserNameLabel from '@components/UserNameLabel';

export default {
  title: 'Components/UserNameLabel',
  component: UserNameLabel,
} as ComponentMeta<typeof UserNameLabel>;

const Template: ComponentStory<typeof UserNameLabel> = (args) => (
  <UserNameLabel {...args} />
);

export const DefaultUserNameLabel = Template.bind({});
DefaultUserNameLabel.args = {
  children: 'User Name Label',
};
