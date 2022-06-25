import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckBoxGroup, ICheckBoxGroup } from '@components/CheckBoxGroup';
import { AppliedFilters } from '@components/AppliedFilters';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormWrapper from '@shared/FormWrapper';
import Button from '@components/shared/Button';
import { IBadge } from '@components/shared/Badge/types';
import { useEffect } from '@storybook/addons';
import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';

export default {
  title: 'Components/AppliedFilters',
  component: CheckBoxGroup,
} as ComponentMeta<typeof CheckBoxGroup>;

interface ITestForm {
  test1?: boolean;
  test2?: boolean;
  test3?: boolean;
}

const Template: ComponentStory<typeof CheckBoxGroup> = (args) => {
  const validationSchema = Yup.object().shape({
    test1: Yup.bool(),
    test2: Yup.bool(),
    test3: Yup.bool(),
  });

  const defaultValues = {
    test1: false,
    test2: false,
    test3: false,
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<ITestForm>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const [badges, setBadges] = useState<IFilterBadge[]>([]);

  const onSubmit = (data: ITestForm) => {
    console.log(data);
  };

  const clearAll = () => {
    reset({
      test1: false,
      test2: false,
      test3: false,
    });
    setBadges([]);
  };

  const createNewBadges = (formValues: ITestForm): IFilterBadge[] => {
    const newBadges: IFilterBadge[] = [];
    Object.keys(formValues).forEach((fieldName) => {
      if (formValues[fieldName]) {
        newBadges.push({
          value: fieldName,
          field: fieldName,
          onRemove: () => console.log(`remove ${fieldName}`),
        });
      }
    });
    return newBadges;
  };

  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      const newBadges = createNewBadges(formValues);
      setBadges(newBadges);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const removeBadge = (name: string) => () => {
    const formValues = getValues();
    formValues[name] = false;
    reset({ ...formValues });
    const newBadges = createNewBadges(formValues);
    setBadges(newBadges);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <AppliedFilters
        header='Applied Filters'
        badges={badges}
        clearAll={clearAll}
      />
      <CheckBoxGroup {...args} register={register} />
      <Button size='l' color='blue' fillStyle={false} fullWidth={false}>
        Send test form
      </Button>
    </FormWrapper>
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
