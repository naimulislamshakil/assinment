import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/userSlice';

export const store = configureStore({
	reducer: {
		[userSlice.reducerPath]: userSlice.reducer,
	},
	middleware: (getDefault) => getDefault().concat(userSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
