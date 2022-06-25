import { IPackItem } from '@type/general';

export const packs: IPackItem[] = [
  {
    id: 1,
    name: 'Tier 3 bronze',
    price: 20.0,
    imageUrl: '/assets/img/jungle/bronze.png',

    description:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus. Lorem ipsum dolor sit amet,',
  },
  {
    id: 2,
    name: 'Tier 2 silver',
    price: 50.0,
    imageUrl: '/assets/img/jungle/silver.png',
    description:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus. Lorem ipsum dolor sit amet,',
  },
  {
    id: 3,
    name: 'Tier 1 gold',
    price: 100.0,
    imageUrl: '/assets/img/jungle/gold.png',
    description:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus. Lorem ipsum dolor sit amet,',
  },
];

export const pack: IPackItem = {
  id: 0,
  name: 'Test Pack 1',
  price: 100,
  imageUrl: '',

  description: 'Lorem ipsum 1',
};
