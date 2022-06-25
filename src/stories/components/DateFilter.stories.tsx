import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DateFilter from '@components/DateFilter';
import { IFilterBadge } from '@components/BuyFilterBlock/BuyFilterBlock';
import { MockFilterStore } from 'src/storage/mockFilterStore';

export default {
  title: 'Components/DateFilter',
  component: DateFilter,
} as ComponentMeta<typeof DateFilter>;

const Template: ComponentStory<typeof DateFilter> = (args) => {
  const [badges, setBadges] = useState<IFilterBadge[]>([]);
  return (
    <MockFilterStore>
      <DateFilter {...args} setBadges={setBadges} />
    </MockFilterStore>
  );
};

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  header: 'Date picker',
  color: 'default',
  size: 's',
};
