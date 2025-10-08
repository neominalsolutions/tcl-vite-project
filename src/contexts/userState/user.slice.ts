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
		reloadSession: (state: UserSessionState) => {
			const sessionPersist = localStorage.getItem('user-session-persist');

			if (sessionPersist) {
				const sessionPersistObject = JSON.parse(sessionPersist);

				state.authenticated = sessionPersistObject.authenticated;
				state.permissions = sessionPersistObject.permissions;
				state.roles = sessionPersistObject.roles;
				state.token = sessionPersistObject.token;
				state.username = sessionPersistObject.username;
			}
		},
		signIn: (
			state: UserSessionState,
			action: PayloadAction<UserSessionState>
		) => {
			console.log('signIn', action.payload);
			// payload güncel state değeri olduğundan direk state payload gelen kod ile güncelledik.
			state.authenticated = action.payload.authenticated;
			state.permissions = action.payload.permissions;
			state.token = action.payload.token;
			state.roles = action.payload.roles;
			state.username = action.payload.username;
			// persist session oluştur.
			localStorage.setItem('user-session-persist', JSON.stringify(state));
		},
		signOut: (state: UserSessionState) => {
			state.authenticated = false;
			state.username = '';
			state.permissions = [];
			state.token = '';
			state.roles = [];
			// persist session temizle
			localStorage.removeItem('user-session-persist');
		},
	},
});

// yukarıdaki tanımı actiponlaro sayfalardan tetiklemek için export et
export const { signIn, signOut, reloadSession } = userSessionSlice.actions;
export const userSessionReducer = userSessionSlice.reducer; // state takibi yapıp state güncelleyen özel functionlar.
