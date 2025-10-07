// axios paketi yüklüyoruz.


// Not: Error Boundry -> Sayfada veri çekilirken hata olursa ekranın çökmesini engellemek için kullanılır.

import { useEffect, useState } from 'react';
import { userClientService, type User } from '../../services/users/user.client';

function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);

	// kullanıcıları getiren fonksiyon
	const loadUsers = async () => {
		const data = await userClientService.getUsers();
		setUsers(data); // ekran state hazır hale getirdik
	};

	// state değişikliğinde tetikleniyordu
	// component mount olduğunda da tetiklenir.
	// sadece mount işleminde 1 kez tetiklenmesi için [] dependency array eklenir.
	useEffect(() => {
		// kullanıcıları getiren servis çağrılır
		loadUsers();
	}, []); // [] yazınca sadece component unmount olduğunda (doma girdiğinde) tetiklenir.

	return (
		<div>
			{users.map((item: User, index: number) => {
				return <div key={index}>{item.username}</div>;
			})}
		</div>
	);
}

export default UsersPage;
