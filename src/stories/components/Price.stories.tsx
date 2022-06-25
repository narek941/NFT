import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Price from '@components/Price';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import FormWrapper from '@components/shared/FormWrapper';
import Button from '@components/shared/Button';
import { MockFilterStore } from 'src/storage/mockFilterStore';
import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';

export default {
  title: 'Components/Price',
  component: Price,
} as ComponentMeta<typeof Price>;

interface ITestForm {
  minPrice?: string | number;
  maxPrice?: string | number;
}

const style = {
  margin: '20px',
  maxWidth: '250px',
  width: '100%',
};
const Template: ComponentStory<typeof Price> = (args) => {
  const validationSchema = Yup.object().shape({
    minPrice: Yup.number()
      .positive()
      .typeError('This field minPrice must contain only numbers')

      .max(1000, 'This field minPrice must  not exceed 1000')
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    maxPrice: Yup.number()

      .positive()
      .typeError('This field maxPrice must contain only numbers')
      .max(1000, 'This field maxPrice must  not exceed 1000')
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ITestForm>({
    defaultValues: {
      minPrice: '',
      maxPrice: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [badges, setBadges] = useState<IFilterBadge[]>([]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const formValues = getValues();

  const addBadge = (badge: IFilterBadge | IFilterBadge[]) => {
    if (Array.isArray(badge)) {
      setBadges([...badges, ...badge]);
    } else {
      setBadges([...badges, badge]);
    }
  };
  const removeBadgeByField = (field: string) =>
    setBadges((prev) => prev.filter((item) => item.field !== field));

  return (
    <MockFilterStore>
      <div style={style}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Price
            {...args}
            register={register}
            error={errors}
            formValues={formValues}
            setValue={setValue}
            setBadges={setBadges}
            addBadge={addBadge}
            removeBadgeByField={removeBadgeByField}
          />
          <Button size='l' color='blue' fillStyle={false} fullWidth={false}>
            Send test form
          </Button>
        </FormWrapper>
      </div>
    </MockFilterStore>
  );
};

export const DefaultPrice = Template.bind({});
DefaultPrice.args = {
  header: 'Price (USD)',
};
