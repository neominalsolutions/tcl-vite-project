/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	TextField,
} from '@mui/material';
import { authService } from '../services/login/auth.client';
import { useDispatch } from 'react-redux';
import { signIn } from '../contexts/userState/user.slice';

function LoginDialog({
	open, // dialog göster yada gizle
	handleClose, // dialoıg kapatmak için
}: {
	open: boolean;
	handleClose(): void;
}) {
	// REDUX

	const dispath = useDispatch();

	// REDUX END

	const loginSchema = yup
		.object({
			email: yup
				.string()
				.email('E-posta formatında giriniz')
				.required('E-Posta boş geçilemez'),
			password: yup
				.string()
				.min(8, 'Min 8 Karakter')
				.max(12, 'Max 12 karakter')
				.required('Parola boş geçilemez'),
		})
		.required();

	const {
		handleSubmit, // form submit function
		formState: { errors }, // -> form güncel state takibi için
		control, // -> form elementleri UI kütüphaneler ile çalışırken
	} = useForm({
		defaultValues: {
			// -> form ilk değerleri
			email: 'eve.holt@reqres.in',
			password: '123456789',
		},
		resolver: yupResolver(loginSchema), // login şemasını forma uygula
	});

	const onFormSubmit = async (data: any) => {
		// form submit edildikten sonraki form bilgileri
		console.log(data);
		handleClose();

		authService
			.login({ ...data, username: data.email })
			.then((response) => {
				console.log('response', response);
				console.log('token', response.data.token);
				// jwt-decode library decoded edip -> tokendan payload bilgilerini aldık

				const userSession = { // -> token payload simüle ettik
					authenticated: true,
					token: response.data.token,
					username: 'ali',
					roles: ['admin'],
					permissions: [{ type: 'User', value: 'Create' }],
				};

				console.log('userSession', userSession);

				// client session state güncellece
				// 	const dispath = useDispatch(); -> state güncellemek için dispatch function kullanılır
				dispath(signIn({ ...userSession }));
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	console.log('...rending');

	// Not: Hook Forms UI kütüphaneleri ile çalışrıken TextInput gibi UI kütüphanelerine ait form elementlerinin state değişikliklerini algılamak için kullanılan bir wrapper component: (Controller)
	// Not: Formu submit edene kadar inputdaki her değişim için render.

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{'Login Formu'}</DialogTitle>
			<DialogContent>
				<Box component="form" autoComplete="off">
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								name="email"
								sx={{ minWidth: '100%' }}
								id="filled-textarea"
								label="Please type email"
								placeholder="Email"
								multiline
								variant="filled"
								helperText={errors.email?.message}
							/>
						)}
					/>

					<Divider />

					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								name="password"
								sx={{ minWidth: '100%' }}
								id="filled-textarea"
								label="Please type password"
								placeholder="Password"
								multiline
								variant="filled"
								helperText={errors.password?.message}
							/>
						)}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSubmit(onFormSubmit)} autoFocus>
					Oturum Aç
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LoginDialog;
