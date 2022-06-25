import { combineReducers } from 'redux';
import auth from '../entities/auth/redux/slice';
import nft from '../entities/nft/redux/slice';
import nftCollection from '../entities/nft_collection/redux/slice';
import user from '../entities/user/redux/slice';
import pack from '../entities/pack/redux/slice';
import filter from '../entities/filters/redux/slice';
import notification from '../entities/notification/redux/slice';
import configuration from '../entities/configuration/redux/slice';

const rootReducer = combineReducers({
  nftCollection,
  nft,
  pack,
  auth,
  user,
  filter,
  notification,
  configuration,
});

export default rootReducer;
