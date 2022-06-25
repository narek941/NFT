import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScrollingWrapper from '@shared/ScrollingWrapper';
import scrollStyle from '@shared/ScrollingWrapper/ScrollingWrapper.module.scss';

export default {
  title: 'Shared/ScrollingWrapper',
  component: ScrollingWrapper,
} as ComponentMeta<typeof ScrollingWrapper>;

const style = {
  padding: '20px',
  maxWidth: '328px',
  width: '100%',
  height: '300px',
};
const loremText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const Template: ComponentStory<typeof ScrollingWrapper> = (args) => {
  return (
    <div style={style}>
      <ScrollingWrapper {...args} />
    </div>
  );
};

export const DefaultScrollingWrapper = Template.bind({});
DefaultScrollingWrapper.args = {
  size: 'l',
  color: 'light',
  children: <div style={{ padding: '20px' }}>{loremText}</div>,
  className: scrollStyle['height-large'],
};

export const MediumScrollingWrapper = Template.bind({});
MediumScrollingWrapper.args = {
  size: 'm',
  color: 'primary',
  children: <div style={{ padding: '20px' }}>{loremText}</div>,
  className: scrollStyle['height-medium'],
};

export const SmallScrollingWrapper = Template.bind({});
SmallScrollingWrapper.args = {
  size: 's',
  color: 'primary',
  children: <div style={{ padding: '20px' }}>{loremText}</div>,
  className: scrollStyle['height-small'],
};
