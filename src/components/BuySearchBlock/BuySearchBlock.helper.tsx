import { IDropDownItem } from '@type/general';

export const currencyOptions: IDropDownItem[] = [
  {
    id: 'USD',
    name: 'USD',
    value: {
      sort: 'price',
      order: 'DESC',
    },
  },
  {
    id: 'EU',
    name: 'EU',
    value: {
      sort: 'price',
      order: 'DESC',
    },
  },
];

export const dropDownOptions: IDropDownItem[] = [
  {
    id: '0',
    name: 'Price high to low',
    value: {
      sort: 'price',
      order: 'DESC',
    },
  },
  {
    id: '1',
    name: 'Price low to high',
    value: {
      sort: 'price',
      order: 'ASC',
    },
  },
  {
    id: '2',
    name: 'Rarity score low to high',
    value: {
      sort: 'rarityScore',
      order: 'ASC',
    },
  },
  {
    id: '3',
    name: 'Rarity score high to low',
    value: {
      sort: 'rarityScore',
      order: 'DESC',
    },
  },
  {
    id: '4',
    name: 'Latest creation date',
    value: {
      sort: 'createdAt',
      order: 'DESC',
    },
  },
  {
    id: '5',
    name: 'Oldest creation date',
    value: {
      sort: 'createdAt',
      order: 'ASC',
    },
  },
  {
    id: '6',
    name: 'Most liked',
    value: {
      sort: 'likesAmount',
      order: 'DESC',
    },
  },

  {
    id: '7',
    name: 'ID high to low',
    value: {
      sort: 'id',
      order: 'DESC',
    },
  },
  {
    id: '8',
    name: 'ID low to high',
    value: {
      sort: 'id',
      order: 'ASC',
    },
  },
];
