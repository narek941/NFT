import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from '@shared/Avatar';

export default {
  title: 'Shared/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const noImage = '/other/avatar.svg';
const user = '/other/user.svg';

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
  nameImage: 'Jhon Doe',
  imgSrc: noImage,
  size: 'l',
  edit: true,
};

export const AvatarColor = Template.bind({});
AvatarColor.args = {
  nameImage: 'Jhon Doe',

  imgSrc: user,
  size: 's',
  color: 'primary',
};
