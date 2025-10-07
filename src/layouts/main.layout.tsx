import {
	AppBar,
	Box,
	Button,
	Container,
	Grid,
	Toolbar,
	Typography,
} from '@mui/material';
import { Link, NavLink, Outlet } from 'react-router';

// Not: Link genelde bir sayfadan diğerine geçiş yapmak için kullanılır.
// NavLink ise aktif olan linki belirtmek için kullanılır.
// Örneğin, kullanıcı "About" sayfasındaysa, "About" linki farklı bir renkte gösterilebilir.

function MainLayout() {
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
											to="/users"
										>
											Users NavLink
										</Link>{' '}
									</Button>
								</Box>

								<Button color="inherit">Login</Button>
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

			<footer>Main Footer</footer>
		</Container>
	);
}

export default MainLayout;
