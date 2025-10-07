// axios paketi yüklüyoruz.

import axios from 'axios';
import { useEffect } from 'react';

function UsersPage() {
	// state değişikliğinde tetikleniyordu
	// component mount olduğunda da tetiklenir.
	// sadece mount işleminde 1 kez tetiklenmesi için [] dependency array eklenir.
	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				// onFullfilled callback fonksiyonu
				console.log('response', response);
			})
			.catch((error) => {
				// onRejected callback fonksiyonu
				console.log('error', error);
			});
	}, []); // [] yazınca sadece component unmount olduğunda (doma girdiğinde) tetiklenir.

	return <div>Users Page</div>;
}

export default UsersPage;
