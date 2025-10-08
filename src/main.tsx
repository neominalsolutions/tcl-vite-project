import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/main.layout.tsx';
import '@fontsource/roboto/400.css';
// import AboutPage from './pages/about/page.tsx';
// import HomePage from './pages/home/page.tsx';
import { lazy } from 'react';
import ErrorBoundryPage from './pages/error.tsx';
import NotFoundPage from './pages/not-found.tsx';
import UsersLoaderPage from './pages/users-loader/page.tsx';
import { userClientService } from './services/users/user.client.ts';
import { Provider } from 'react-redux'; // store daki stateleri uygulama genelinde yöneten servis
import { store } from './contexts/store.ts'; // provider store ile çalışsın
import AuthGuard from './guards/auth.guard.tsx';
import UnAuthorizePage from './pages/auth/page.tsx';

// tembel sayfa yüklemesi arkadan yükleme
// nbu sayede uygulamanın ilk açışı hızlanır.
const HomePage = lazy(() => import('./pages/home/page'));
const AboutPage = lazy(() => import('./pages/about/page'));
const UsersPage = lazy(() => import('./pages/users/page'));
const UserDetailPage = lazy(() => import('./pages/users/[id]/page.tsx'));
// index:true anasayfa tanımı MainLayout için ilk açılış sayfası HomePage
const router = createBrowserRouter([
	{
		path: '/',
		Component: MainLayout,
		children: [
			{ index: true, Component: HomePage, ErrorBoundary: ErrorBoundryPage },
			{ path: 'about', Component: AboutPage, ErrorBoundary: ErrorBoundryPage },
			{
				path: 'users',

				// @PreAuthorize
				element: (
					<AuthGuard>
						<UsersPage />
					</AuthGuard>
				),
			},
			{
				path: 'users-loader',
				loader: async () => {
					// sayfa açılmadan önce gidip arka planda veri çekme işlemi başlatıyor
					return await userClientService.getUsers(); // veri yüklenince sayfaya veriyi useLoaderData hook ile veriyor, bu sayede eğer bu servis hata varsa bu errorBoundary ilgisi haline geliyor.
				},
				element: (
					<AuthGuard>
						<UsersLoaderPage />
					</AuthGuard>
				),
				ErrorBoundary: ErrorBoundryPage,
			},
			{
				path: 'users/:id',
				Component: UserDetailPage,
				ErrorBoundary: ErrorBoundryPage,
			},
			{
				path: 'unauthorize',
				Component: UnAuthorizePage,
			},
		],
	},
	{
		path: '*', // herhangi bir sayfa route tanımlanmadığında hata sayfasını göster, en altta olucak.
		Component: NotFoundPage,
	},
]);

// HomePage ve AboutPage layout -> MainLayout içinde render edilecek.

// RouterProvider: React Router'ın sağladığı bir bileşen.
// Uygulamanın yönlendirme yapılandırmasını alır ve uygulamaya yönlendirme işlevselliği ekler.
// createBrowserRouter: Tarayıcı tabanlı bir yönlendirici oluşturur.
// Tarayıcının URL'sini izler ve uygun bileşeni render eder.

// createRoot: React 18 ile gelen yeni API. React uygulamasını başlatmak için kullanılır.

// Not: Render süreci ile React Componentler doma yansır.
// Uygulamanın başlangıç noktasıdır.
createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

// 2. aşama Provider tanımı
