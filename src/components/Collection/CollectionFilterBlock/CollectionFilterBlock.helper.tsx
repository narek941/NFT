import { IDropDownItem } from '@type/general';
import { AnyProperties } from 'src/common/models/misc';
import { uuid } from 'uuidv4';
import * as Yup from 'yup';

type StaticCheckboxProps = {
  distributions?: { AUCTION: boolean; FIXED_PRICE: boolean; PACKS: boolean };
  status?: { available: boolean; sold: boolean };
  generative?: { Yes: boolean; No: boolean };
};

export type ICollectionFilterForm = StaticCheckboxProps & AnyProperties;

export const validationSchema = Yup.object().shape({
  distributions: Yup.object().shape({
    AUCTION: Yup.bool(),
    FIXED_PRICE: Yup.bool(),
    PACKS: Yup.bool(),
  }),
  generative: Yup.object().shape({ Yes: Yup.bool(), No: Yup.bool() }),
  status: Yup.object().shape({ AVAILABLE: Yup.bool(), SOLD: Yup.bool() }),
});

export const statusValues = [
  {
    id: uuid(),
    name: 'status.AVAILABLE',
    text: 'Available',
    error: null,
  },
  {
    id: uuid(),
    name: 'status.SOLD',
    text: 'Sold',
    error: null,
  },
];

export const collectionDropDownOptions: IDropDownItem[] = [
  {
    id: '0',
    name: 'Latest drop date',
    value: {
      sort: 'dropDate',
      order: 'DESC',
    },
  },
  {
    id: '1',
    name: 'Oldest drop date',
    value: {
      sort: 'dropDate',
      order: 'ASC',
    },
  },
];
