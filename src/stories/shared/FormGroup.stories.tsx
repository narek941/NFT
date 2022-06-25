import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormGroup from '@shared/FormGroup';
import Input from '@components/shared/Input';

export default {
  title: 'Shared/FormGroup',
  component: FormGroup,
} as ComponentMeta<typeof FormGroup>;

const Template: ComponentStory<typeof FormGroup> = (args) => (
  <FormGroup {...args} />
);

export const DefaultFormGroup = Template.bind({});
DefaultFormGroup.args = {
  children: (
    <>
      <FormGroup space='l'>
        <Input id='input_1' name='input_1' placeholder='Enter your name' />
      </FormGroup>
      <FormGroup space='l'>
        <Input id='input_2' name='input_2' placeholder='Enter your name' />
      </FormGroup>
    </>
  ),
};
export const SpaceSmallFormGroup = Template.bind({});
SpaceSmallFormGroup.args = {
  children: (
    <>
      <FormGroup space='s'>
        <Input id='input_3' name='input_3' placeholder='Enter your name' />
      </FormGroup>
      <FormGroup space='s'>
        <Input id='input_4' name='input_4' placeholder='Enter your name' />
      </FormGroup>
    </>
  ),
};
