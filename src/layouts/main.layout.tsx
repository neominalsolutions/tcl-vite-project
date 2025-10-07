import { Link, NavLink, Outlet } from 'react-router';

// Not: Link genelde bir sayfadan diğerine geçiş yapmak için kullanılır.
// NavLink ise aktif olan linki belirtmek için kullanılır.
// Örneğin, kullanıcı "About" sayfasındaysa, "About" linki farklı bir renkte gösterilebilir.

function MainLayout() {
	return (
		<div>
			<header>Main Header</header>
			<nav>
				<Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
				<NavLink
					to="/"
					style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}
				>
					Home NavLink
				</NavLink>{' '}
				|{' '}
				<NavLink
					to="/about"
					style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}
				>
					About NavLink
				</NavLink>
				|{' '}
				<NavLink
					to="/users"
					style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}
				>
					Users NavLink
				</NavLink>
			</nav>
			<main style={{ padding: '20px', minHeight: '80vh' }}>
				{/* Main content goes here */}
				<Outlet />
			</main>
			<footer>Main Footer</footer>
		</div>
	);
}

export default MainLayout;
