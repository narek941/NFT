import { createAction } from '@reduxjs/toolkit';
import { IFilterState } from 'src/common/models/filter';

export const filtersUpdate =
  createAction<Partial<IFilterState>>('filters/update');

export const filtersReset = createAction('filters/reset');
