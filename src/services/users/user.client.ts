import { axiosClientService } from '../axios.client';

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

// componenten buradaki export edilen getUsers fonksiyonu çağrılır.
const getUsers = async (): Promise<User[]> => {
	return axiosClientService.get('/users');
};

export const userClientService = {
	getUsers,
};
