import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../features/ticketsSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});
