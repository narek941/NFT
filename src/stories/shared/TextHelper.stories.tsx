import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextHelper from '@components/shared/TextHelper';

const style = {
  margin: '20px auto',
  maxWidth: '350px',
  width: '100%',
};
export default {
  title: 'Shared/TextHelper',
  component: TextHelper,
} as ComponentMeta<typeof TextHelper>;

const Template: ComponentStory<typeof TextHelper> = (args) => (
  <div style={style}>
    <TextHelper {...args} />
  </div>
);

export const DefaultTextHelper = Template.bind({});
DefaultTextHelper.args = {
  title: 'Password strength:',
  children: (
    <p>
      {`Use at least 8 characters. Don't use a password from another site, or
      something too obvious like your pet's name. Your password can be any
      combination of letters, numbers, and symbols.`}
    </p>
  ),
};
