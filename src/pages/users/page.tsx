/* eslint-disable @typescript-eslint/no-explicit-any */
// axios paketi yüklüyoruz.

// Not: Error Boundry -> Sayfada veri çekilirken hata olursa ekranın çökmesini engellemek için kullanılır.

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { userClientService, type User } from '../../services/users/user.client';
import { useNavigate } from 'react-router';
import FallbackError from '../../components/fallback.error';

// Not: eğer veri component doma mount edildikten sonra servis de bir hata durumu meydana geliyorsa, hata fallback işlemlerini manuel olarak yürüyoruz.
// Ama react router v7 ile birlikte loader function özelliği geldi. Sayfaya çekilecek olan verileri bu şekilde kullanırsak, component mount edilmeden veri çekme işlemi başlatılır. eğer bu veri çekme işleminde bir reject durumu oluşursa bu durumda errorBoundry sayfasına fallback olarak yönlendirilir.

function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [errorState, setErrorState] = useState<any>(); // global olarak da yönetibiliyor.
	// manuel olarak fallback component oluşturma yapmamız gerekiyor

	// kullanıcıları getiren fonksiyon
	const loadUsers = async () => {
		try {
			const data = await userClientService.getUsers();
			setUsers(data); // ekran state hazır hale getirdik
		} catch (error) {
			setErrorState(error);
		}
	};

	// state değişikliğinde tetikleniyordu
	// component mount olduğunda da tetiklenir.
	// sadece mount işleminde 1 kez tetiklenmesi için [] dependency array eklenir.
	useEffect(() => {
		// kullanıcıları getiren servis çağrılır
		loadUsers();
	}, []); // [] yazınca sadece component unmount olduğunda (doma girdiğinde) tetiklenir.

	// 	<div key={index}>{item.username}</div>;

	// key={index} -> ekranda listenecek itemların indeksinden virtual domdaki konumu ayarlanıyor
	// hızlı render almak için önemli -> map varsa keyExtractor tanımı yapalım.

	// Not: Genelde Success işlemleri sonrasında sayfanın yönlendirilmesi yada Login sonrası sayfa yönledirme gibi durumlarda ise useNavigate hook kullanırız.
	const navigate = useNavigate();

	if (errorState) {
		return <FallbackError error={errorState} />;
	} else {
		return (
			<Box
				sx={{
					p: 2,
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				{users.map((item: User, index: number) => {
					return (
						<Card variant="outlined" key={index} sx={{ m: 2, minWidth: 400 }}>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{item.name}
								</Typography>
								<Typography variant="body2" sx={{ color: 'text.secondary' }}>
									{item.username} / {item.email}
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									onClick={() => navigate(`/users/${item.id}`)}
									size="small"
								>
									Detaylı Bilgi
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</Box>
		);
	}
}

export default UsersPage;
