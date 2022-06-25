import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table } from '@shared/Tables/Table';

import Badge from '@shared/Badge';
const data = [
  {
    id: '01',
    bid: '$3700.00',
    user: (
      <Badge className='color-primary' color='light' rounded size='s'>
        @user1946000
      </Badge>
    ),
    date: '25/01/2022, 10:34 PM',
  },
  {
    id: '02',
    bid: '$3700.00',
    user: (
      <Badge className='color-primary' color='light' rounded size='s'>
        @user1946000
      </Badge>
    ),
    date: '25/01/2022, 10:34 PM',
  },
];

export default {
  title: 'Shared/Tables',
  component: Table,
} as ComponentMeta<typeof Table>;

const style = {
  margin: '20px auto',
  maxWidth: '643px',
  width: '100%',
};
const Template: ComponentStory<typeof Table> = (args) => {
  return (
    <div style={style}>
      <Table {...args} />
    </div>
  );
};

export const DefaultTables = Template.bind({});
DefaultTables.args = {
  rowsTable: data,
};
