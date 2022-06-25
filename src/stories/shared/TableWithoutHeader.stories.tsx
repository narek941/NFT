import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TableWithoutHeader } from '@shared/Tables/TableWithoutHeader';

import Badge from '@shared/Badge';
import BadgeList from '@components/shared/Badge/BadgeList';
const data = [
  {
    id: '01',
    title: <span className='text-bold'>Hair color:</span>,
    desc: 'Red',
    other: (
      <BadgeList className='m-0'>
        <Badge color='secondary' rounded size='s'>
          9933
        </Badge>
        <Badge rounded size='s' color='white'>
          +168.23
        </Badge>
      </BadgeList>
    ),
  },
  {
    id: '02',
    title: <span className='text-bold'>Green eyes:</span>,
    desc: 'No',
    other: '',
  },
  {
    id: '03',
    title: <span className='text-bold'>Age:</span>,
    desc: '5 years',
    other: '',
  },
  {
    id: '04',
    title: <span className='text-bold'>Creation date:</span>,
    desc: '25/01/2022',
    other: (
      <BadgeList className='m-0'>
        <Badge color='secondary' rounded size='s'>
          34
        </Badge>{' '}
        <Badge rounded size='s' color='white'>
          +73.14
        </Badge>
      </BadgeList>
    ),
  },
];

export default {
  title: 'Shared/TableWithoutHeader',
  component: TableWithoutHeader,
} as ComponentMeta<typeof TableWithoutHeader>;

const style = {
  margin: '20px auto',
  maxWidth: '643px',
  width: '100%',
};
const Template: ComponentStory<typeof TableWithoutHeader> = (args) => {
  return (
    <div style={style}>
      <TableWithoutHeader {...args} />
    </div>
  );
};

export const DemoTableWithoutHeader = Template.bind({});
DemoTableWithoutHeader.args = {
  rowsTable: data,
};
