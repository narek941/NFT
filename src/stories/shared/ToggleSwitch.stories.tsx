/* eslint-disable no-undef */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleSwitch from '@components/shared/ToggleSwitch';
import { useForm, UseFormRegister } from 'react-hook-form';

export default {
  title: 'Shared/ToggleSwitch',
  component: ToggleSwitch,
} as ComponentMeta<typeof ToggleSwitch>;

export interface IToggleSwitch {
  register: UseFormRegister<any>;
}
const Template: ComponentStory<typeof ToggleSwitch> = (args) => {
  const { register } = useForm<IToggleSwitch>();
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <ToggleSwitch {...args} register={register} />
    </div>
  );
};

export const DefaultSwitcher = Template.bind({});
DefaultSwitcher.args = {
  id: 'ToggleSwitch',
  text: 'Toggle Switch',
  name: 'ToggleSwitch',
  error: null,
};
