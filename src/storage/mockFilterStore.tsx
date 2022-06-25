import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import filterReducer from '@entities/filters/redux/slice';

export const MockFilterStore = ({ children }) => (
  <Provider
    store={configureStore({
      reducer: combineReducers({
        filter: filterReducer,
      }),
    })}
  >
    {children}
  </Provider>
);
