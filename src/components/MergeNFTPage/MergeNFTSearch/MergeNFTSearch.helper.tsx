import { IDropDownItem } from '@type/general';

export const dropDownOptions: IDropDownItem[] = [
  {
    id: '1',
    name: 'Price High to Low',
    value: {
      sort: 'price',
      order: 'desc',
    },
  },
  {
    id: '2',
    name: 'Price Low to High',
    value: {
      sort: 'price',
      order: 'asc',
    },
  },
  {
    id: '3',
    name: 'Rarity Score Low to High',
    value: {
      sort: 'rarity',
      order: 'asc',
    },
  },
  {
    id: '3',
    name: 'Rarity Score High to Low',
    value: {
      sort: 'rarity',
      order: 'desc',
    },
  },
  {
    id: '4',
    name: 'Creation date Low to High',
    value: {
      sort: 'createdAt',
      order: 'asc',
    },
  },
  {
    id: '5',
    name: 'Creation date High to Low',
    value: {
      sort: 'createdAt',
      order: 'desc',
    },
  },
  {
    id: '6',
    name: 'Most liked High to Low',
    value: {
      sort: 'likes',
      order: 'desc',
    },
  },
  {
    id: '7',
    name: 'Most liked Low to High ',
    value: {
      sort: 'likes',
      order: 'asc',
    },
  },
];
