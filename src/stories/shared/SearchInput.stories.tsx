import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchInput from '@shared/SearchInput';

export default {
  title: 'Shared/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

const onSearch = (value: Record<string, string>) => {
  console.log('onSearch', value);
};

export const DefaultSearchInput = Template.bind({});
DefaultSearchInput.args = {
  onSearch: onSearch,
  debounceTime: 500,
  placeholder: 'Search via Token ID/Name/Traits',
};
