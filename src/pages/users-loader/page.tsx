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
import { useLoaderData, useNavigate } from 'react-router';
import { type User } from '../../services/users/user.client';

function UsersLoaderPage() {
    // react router v7 ile geldi yeni bir feature
	const users = useLoaderData(); // sayfaya yüklenecek bir veri varsa, useEffect ile arkadan mounted olduktan sonra geneksel yükleme yerine sayfa yüklenirken verinin hazır hale getirildiği data loader yaklaşımı.

	const navigate = useNavigate();

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

export default UsersLoaderPage;
