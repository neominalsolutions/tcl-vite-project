// userState client state nesnesinde neler tutulacak

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// client tarafta login sonrası componentler arası taşınacak bilgiler için bir state tanımı yaptık
type UserSessionState = {
	username: string;
	authenticated: boolean;
	roles: string[];
	permissions: { type: string; value: string }[];
	token: string;
};

// state ilk değerlerini verdik.
const initState: UserSessionState = {
	username: '',
	authenticated: false,
	roles: [],
	permissions: [],
	token: '',
};

// state signIn ve signOut actionlara göre state nasıl güncelleyeceğinin algoritması yazıldı.
const userSessionSlice = createSlice({
	name: 'UserSesssion', // STatelerin içindeki actionları tetil bir isie bağlıyoruz
	initialState: initState, // default ilk değerimiz
	reducers: {
		signIn: (
			state: UserSessionState,
			action: PayloadAction<UserSessionState>
		) => {
			// payload güncel state değeri olduğundan direk state payload gelen kod ile güncelledik.
			state = action.payload;
		},
		signOut: (state: UserSessionState) => {
			state.authenticated = false;
			state.username = '';
			state.permissions = [];
			state.token = '';
			state.roles = [];
		},
	},
});

// yukarıdaki tanımı actiponlaro sayfalardan tetiklemek için export et
export const { signIn, signOut } = userSessionSlice.actions;
export const userSessionReducer = userSessionSlice.reducer; // state takibi yapıp state güncelleyen özel functionlar.
