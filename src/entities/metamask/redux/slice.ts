import { createSlice } from '@reduxjs/toolkit';

type IMetaMaskStatus = 'disabled' | 'enabled' | 'connected' | 'disconnected';

interface IMetamaskState {
  pending: boolean;
  error: any;
  address: string;
  status: IMetaMaskStatus;
}

const initialState: IMetamaskState = {
  pending: false,
  error: null,
  address: '',
  status: 'disconnected',
};
const slice = createSlice({
  name: 'pack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default slice.reducer;
