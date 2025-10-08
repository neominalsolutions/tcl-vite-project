import { axiosClientService } from '../axios.client';

// Not: Page Cpomponentlere çekilen verilerin ekrandaki componentlere bind edilmesi için, kolay yazım açısında API deki her bir DTO Objesi için bir interface tanımlanır.

// API dan veri çekeceksek en doğru interface i tanımlayalım.
export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

// componenten buradaki export edilen getUsers fonksiyonu çağrılır.
const getUsers = async () => {
	console.log('User Client Service: Getting users...');

	// ya böyle bir server hatası alıcaz
	// return Promise.reject({ message: 'Internal Server Error' });

	// yada path yanlış olucak 404 gibi bir hata alıcaz.
	return axiosClientService.get(
		'/users',
		{ headers: { Authorization: 'Bearer xtuyuyuad.asdsad.asdsadsad' } },
		3000
	); // 7 sn timeout
};

export const userClientService = {
	getUsers,
};
