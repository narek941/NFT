import { createSlice } from '@reduxjs/toolkit';
import { ConfigurationState } from 'src/common/models/configuration';
import { getNavigationConfigRequest } from './actions';

const initialState: ConfigurationState = {
  navigationConfig: {},
};

const slice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNavigationConfigRequest.fulfilled, (state, action) => {
      state.navigationConfig = action.payload.links;
    });
  },
});

export default slice.reducer;
