import { IDropDownItem } from '@type/general';

export const dropDownOptions: IDropDownItem[] = [
  {
    id: '0',
    name: 'Rarity score low to high',
    value: {
      sort: 'rarityScore',
      order: 'ASC',
    },
  },
  {
    id: '1',
    name: 'Rarity score high to low',
    value: {
      sort: 'rarityScore',
      order: 'DESC',
    },
  },
  {
    id: '2',
    name: 'Oldest purchase date',
    value: {
      sort: 'createdAt',
      order: 'ASC',
    },
  },
  {
    id: '3',
    name: 'Latest purchase date',
    value: {
      sort: 'createdAt',
      order: 'DESC',
    },
  },
];
