import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pagination from '@components/shared/Pagination';

export default {
  title: 'Shared/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const DefaultPagination = Template.bind({});
DefaultPagination.args = {
  setCurrentPage: (page) => {
    console.log(page);
  },
  currentPage: 1,
  countOfPage: 9,
};
