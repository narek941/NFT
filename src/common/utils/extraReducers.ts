export const pendingReducer = (state, action) => {
  state.pending = true;
  state.error = null;
};

export const errorReducer = (state, action) => {
  state.pending = false;
  state.error = action.payload.message;
};
