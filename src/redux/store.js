import { configureStore } from '@reduxjs/toolkit';
import bloodTypesReducer from './bloodTypes';
import provincesReducer from './provinces';
import orgTypesReducer from './orgTypes';

export default configureStore({
  reducer: {
    bloodTypes: bloodTypesReducer,
    provinces: provincesReducer,
    orgTypes: orgTypesReducer
  }
});
