import axios from 'axios';

const login = async ({
	email,
	username,
	password,
}: {
	email: string;
	username: string;
	password: string;
}) => {
	console.log('authServiceService: Login...');

	const param = { email, username, password };

	// ya böyle bir server hatası alıcaz
	// return Promise.reject({ message: 'Internal Server Error' });

	// yada path yanlış olucak 404 gibi bir hata alıcaz.
	return axios.post('https://reqres.in/api/login', param, {
		headers: { 'x-api-key': 'reqres-free-v1' },
	}); // 7 sn timeout
};

const logout = async () => {
	console.log('authServiceService: Logout...');

	// ya böyle bir server hatası alıcaz
	// return Promise.reject({ message: 'Internal Server Error' });

	// yada path yanlış olucak 404 gibi bir hata alıcaz.
	return axios.post(
		'https://reqres.in/api/logout',
		{}, // params
		{
			headers: { 'x-api-key': 'reqres-free-v1' },
		}
	); // 7 sn timeout
};

export const authService = {
	login,
	logout,
};
