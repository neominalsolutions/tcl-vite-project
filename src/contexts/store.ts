// 1. aşama statlerin tutulduğu store oluşturma

import { configureStore } from '@reduxjs/toolkit';
import { userSessionReducer } from './userState/user.slice';

// store tüm statelerin merkezi olarak barındığı bölge
export const store = configureStore({
	reducer: {
		userSessionState: userSessionReducer, // stateleri yönetmek için reducer tanımı yaparız.
	},
});

export type RootState = ReturnType<typeof store.getState>; // uygulamadaki tüm statelere erişiriz.
export type AppDispatch = typeof store.dispatch; // state değişiklikleri için
