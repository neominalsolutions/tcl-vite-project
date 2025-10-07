import { axiosClientService } from '../axios.client';

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

// componenten buradaki export edilen getUsers fonksiyonu çağrılır.
const getUsers = async (): Promise<User[]> => {
	console.log('User Client Service: Getting users...');
	return axiosClientService.get(
		'/users',
		{ headers: { Authorization: 'Bearer xtuyuyuad.asdsad.asdsadsad' } },
		300
	); // 7 sn timeout
};

export const userClientService = {
	getUsers,
};
