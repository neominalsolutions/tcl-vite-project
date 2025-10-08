import {
	AppBar,
	Box,
	Button,
	Container,
	Grid,
	MenuItem,
	Menu,
	Toolbar,
	Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import LoginDialog from '../components/login.dialog';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../contexts/store';
import { authService } from '../services/login/auth.client';
import { reloadSession, signOut } from '../contexts/userState/user.slice';

// Not: Link genelde bir sayfadan diğerine geçiş yapmak için kullanılır.
// NavLink ise aktif olan linki belirtmek için kullanılır.
// Örneğin, kullanıcı "About" sayfasındaysa, "About" linki farklı bir renkte gösterilebilir.

function MainLayout() {
	const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('her uyggulama reload olduğunda girilen yer');
		dispatch(reloadSession());
	}, []);

	// client state erişim sağlıyoruz
	const userSessionState = useSelector(
		(rootState: RootState) => rootState.userSessionState
	);

	const onLoginClick = () => {
		setVisibleDialog(!visibleDialog);
	};

	// bazen arayüzde bir elementin referansına başka bir component element ihtiyaç duyarsa bu durumda useRef hook ile bu referans yönetimi yapılır. Hesap menuüsünün üstüne gelince bu menu altında context menu gibi bir açılır menu açtırmak istiyoruz bu durumda bu menu anchorElement olarak-> Hesap butonunun referansını kullanmalı
	// Senaryo ->
	const anchorEl = useRef(null);
	const navigate = useNavigate();

	const onLogOut = () => {
		authService
			.logout() // apiden logout
			.then((response) => {
				console.log('logout', response);
				dispatch(signOut()); // session logOut
				navigate('/'); // anasayfaya yönlendir
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	return (
		<Container maxWidth="xl">
			<Grid sx={{ flexGrow: 1 }} container spacing={2}>
				<Grid size={12}>
					<Box
						sx={{
							flexGrow: 1,
							borderBottom: '3px solid lightgray',
							mb: 2,
						}}
					>
						<AppBar position="static" color="primary" enableColorOnDark>
							<Toolbar
								sx={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<Typography variant="h6" component="div">
									React JS APP
								</Typography>

								<Box
									sx={{
										mr: 2,
									}}
								>
									<Button color="inherit">
										<NavLink
											to="/"
											style={({ isActive }) => ({
												color: isActive ? 'yellow' : 'white',
												textDecoration: 'none',
											})}
										>
											Home NavLink
										</NavLink>{' '}
									</Button>

									<Button color="inherit">
										<NavLink
											to="/about"
											style={({ isActive }) => ({
												color: isActive ? 'yellow' : 'white',
												textDecoration: 'none',
											})}
										>
											About NavLink
										</NavLink>{' '}
									</Button>

									{userSessionState.authenticated && (
										<>
											<Button color="inherit">
												<NavLink
													to="/users"
													style={({ isActive }) => ({
														color: isActive ? 'yellow' : 'white',
														textDecoration: 'none',
													})}
												>
													Users NavLink
												</NavLink>{' '}
											</Button>

											<Button color="inherit">
												<Link
													style={{ textDecoration: 'none', color: 'white' }}
													to="/users-loader"
												>
													Users Loader
												</Link>{' '}
											</Button>
										</>
									)}
								</Box>

								<Box sx={{ display: 'flex', justifyContent: 'right' }}>
									{!userSessionState.authenticated && (
										<Button onClick={onLoginClick} color="inherit">
											Login
										</Button>
									)}

									{userSessionState.authenticated && (
										<>
											<Button
												ref={anchorEl} // Hesap button UI Referansı
												onClick={() => setMenuVisible(!menuVisible)}
												color="inherit"
											>
												{userSessionState.username}
											</Button>

											<Menu
												anchorEl={() => anchorEl.current} // Hesap button UI Referansada Menu bağla
												id="basic-menu"
												open={menuVisible}
												onClose={() => setMenuVisible(false)}
												slotProps={{
													list: {
														'aria-labelledby': 'basic-button',
													},
												}}
											>
												<MenuItem onClick={() => setMenuVisible(false)}>
													Profil
												</MenuItem>
												<MenuItem onClick={onLogOut}>Oturumu Kapat</MenuItem>
											</Menu>
										</>
									)}
								</Box>
							</Toolbar>
						</AppBar>
					</Box>
				</Grid>
				{/* <Grid size={4}>Sidebar</Grid> */}
				<Grid size={12}>
					<main style={{ padding: '20px', minHeight: '80vh' }}>
						{/* Main content goes here */}
						<Outlet />
					</main>
				</Grid>
			</Grid>

			<LoginDialog
				open={visibleDialog}
				handleClose={() => setVisibleDialog(false)}
			/>

			<footer>Main Footer</footer>
		</Container>
	);
}

export default MainLayout;
