import { IDropDownItem } from '@type/general';

export const sortDropDownOptions: IDropDownItem[] = [
  {
    id: '0',
    name: 'Creation date low to high',
    value: {
      sort: 'createdAt',
      order: 'ASC',
    },
  },
  {
    id: '1',
    name: 'Creation date High to Low',
    value: {
      sort: 'createdAt',
      order: 'DESC',
    },
  },
  {
    id: '2',
    name: 'ID high to low',
    value: {
      sort: 'id',
      order: 'DESC',
    },
  },
  {
    id: '3',
    name: 'ID low to high',
    value: {
      sort: 'id',
      order: 'ASC',
    },
  },
];
