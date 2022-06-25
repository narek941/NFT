import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IFilterState } from 'src/common/models/filter';
import { isServer } from 'src/common/utils/common';
import { DEFAULT_LIMIT } from 'src/common/utils/pagination';
import { RootState } from 'src/storage/configureStore';
import { filtersReset, filtersUpdate } from './actions';

const queryParams = new URLSearchParams(
  !isServer ? window.location.search : ''
);

const initialState: IFilterState = {
  page: Number(queryParams.get('page') || 1),
  limit: Number(queryParams.get('limit') || DEFAULT_LIMIT),
  collectionId: Number(queryParams.get('collectionId')) || null,
  minPrice: Number(queryParams.get('minPrice')) || null,
  maxPrice: Number(queryParams.get('maxPrice')) || null,
  rarities: queryParams.get('rarities') || null,
  traits: queryParams.get('traits') || null,
  fromDate: queryParams.get('fromDate') || null,
  toDate: queryParams.get('toDate') || null,
  utilities: queryParams.get('utilities') || null,
  distributions: queryParams.get('distributions') || null,
  mergeable: queryParams.get('mergeable') || null,
  generative: queryParams.get('generative') || null,
  status: queryParams.get('status') || null,
  dropDateFrom: queryParams.get('dropDateFrom') || null,
  dropDateTo: queryParams.get('dropDateTo') || null,
  isResetAction: false,
  isLoading: false,
  search: queryParams.get('search') || null,
  sort: queryParams.get('sort') || null,
  order: queryParams.get('order') || null,
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state.isLoading = action.payload.filter.isLoading;
    });
    builder.addCase(
      filtersUpdate,
      (state, action: PayloadAction<Partial<IFilterState>>) => {
        return { ...state, ...action.payload, isResetAction: false };
      }
    );
    builder.addCase(filtersReset, (state) => {
      const initState = Object.keys(state).reduce((res, key) => {
        res[key] = null;
        return res;
      }, {} as IFilterState);

      return {
        ...initState,
        page: 1,
        limit: DEFAULT_LIMIT,
        isResetAction: true,
      };
    });
  },
});

export default slice.reducer;
