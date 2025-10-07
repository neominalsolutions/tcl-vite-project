import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/main.layout.tsx';
import '@fontsource/roboto/400.css';
// import AboutPage from './pages/about/page.tsx';
// import HomePage from './pages/home/page.tsx';
import { lazy } from 'react';

// tembel sayfa yüklemesi arkadan yükleme
// nbu sayede uygulamanın ilk açışı hızlanır.
const HomePage = lazy(() => import('./pages/home/page'));
const AboutPage = lazy(() => import('./pages/about/page'));
const UsersPage = lazy(() => import('./pages/users/page'));
// index:true anasayfa tanımı MainLayout için ilk açılış sayfası HomePage
const router = createBrowserRouter([
	{
		path: '/',
		Component: MainLayout,
		children: [
			{ index: true, Component: HomePage },
			{ path: 'about', Component: AboutPage },
			{ path: 'users', Component: UsersPage },
		],
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
	<RouterProvider router={router} />
);
