import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Option } from '@components/shared/Option';

import IconOptionA from 'public/icon-options/option_a.svg';
import IconOptionB from 'public/icon-options/option_b.svg';

export default {
  title: 'Shared/Option',
  component: Option,
} as ComponentMeta<typeof Option>;

const style = {
  margin: '20px',
  maxWidth: '201px',
  width: '100%',
};

const imageUrl = '/public/assets/img/slider-placeholder.png';

const Template: ComponentStory<typeof Option> = (args) => {
  return (
    <div style={style}>
      <Option {...args} />
    </div>
  );
};

export const DefaultOption = Template.bind({});
DefaultOption.args = {
  text: 'Option A',
};

export const OptionWithIconClose = Template.bind({});
OptionWithIconClose.args = {
  text: 'Option B',
  isActive: true,
  imageUrl: imageUrl,
};
