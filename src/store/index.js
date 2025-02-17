import { configureStore } from '@reduxjs/toolkit';
import threatReducer from './threatSlice';

export const store = configureStore({
  reducer: {
    threats: threatReducer,
  },
});