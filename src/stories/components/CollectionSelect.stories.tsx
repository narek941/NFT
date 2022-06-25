import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { collectionList } from 'src/__mocks__/collectionList';

import { CollectionSelect } from '@components/CollectionSelect';
import { useForm } from 'react-hook-form';
import FormWrapper from '@components/shared/FormWrapper';
import Button from '@components/shared/Button';
import { MockFilterStore } from 'src/storage/mockFilterStore';

interface ITestForm {
  [prop: string]: boolean | undefined;
}

export default {
  title: 'Components/Collection Select',
  component: CollectionSelect,
} as ComponentMeta<typeof CollectionSelect>;

const Template: ComponentStory<typeof CollectionSelect> = (args) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITestForm>({});

  const onSubmit = (data: ITestForm) => {
    console.log('form is submitted', data);
  };

  return (
    <MockFilterStore>
      <div style={{ width: '400px' }}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <CollectionSelect {...args} register={register} reset={reset} />
          <Button size='l' color='blue' fillStyle={false} fullWidth={false}>
            Send test form
          </Button>
        </FormWrapper>
      </div>
    </MockFilterStore>
  );
};

export const DefaultCollectionSelect = Template.bind({});
DefaultCollectionSelect.args = {
  callback: (id: number | undefined) => {
    console.log('callback fired: ', id);
  },
  collections: collectionList,
};
