import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckBoxGroup, ICheckBoxGroup } from '@components/CheckBoxGroup';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormWrapper from '@shared/FormWrapper';
import Button from '@components/shared/Button';

export default {
  title: 'Components/CheckBoxGroup',
  component: CheckBoxGroup,
} as ComponentMeta<typeof CheckBoxGroup>;

interface ITestForm {
  test1: boolean;
  test2: boolean;
  text3: boolean;
}

const Template: ComponentStory<typeof CheckBoxGroup> = (args) => {
  const validationSchema = Yup.object().shape({
    test1: Yup.bool(),
    test2: Yup.bool(),
    test3: Yup.bool(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ITestForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: ITestForm) => {
    console.log(data);
  };

  const style = {
    margin: '20px',
    maxWidth: '201px',
    width: '100%',
  };
  return (
    <div style={style}>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <CheckBoxGroup {...args} register={register} />
        <Button size='l' color='blue' fillStyle={false} fullWidth={false}>
          Send test form
        </Button>
      </FormWrapper>
    </div>
  );
};

export const DefaultGroup = Template.bind({});
DefaultGroup.args = {
  header: 'Test Group',
  checkboxArray: [
    {
      id: '1',
      name: 'test1',
      text: 'Test 1',
      error: null,
    },
    {
      id: '2',
      name: 'test2',
      text: 'Test 2',
      error: null,
    },
    {
      id: '3',
      name: 'test3',
      text: 'Test 3',
      error: null,
    },
  ],
};
