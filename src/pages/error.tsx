/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRouteErrorResponse, useRouteError } from 'react-router';

// tüm uygulamadki componentlere erro boundry olarak bu componenti gösteririyoruz.
function ErrorBoundryPage() {
	const error: any = useRouteError(); // component içerisinde gelişen hataları yakalarız

	console.log('error', error);

	if (isRouteErrorResponse(error)) {
		// route ile ilgili bir hata durumunda kullandığımız hook
		return (
			<>
				<h1>Uyarı!</h1>
				<p>Status: {error.status}</p>
				<p>{error.statusText}</p>
			</>
		);
	}

	return (
		<>
			<h1>Birşeyler ters gitti</h1>
			<p>{error.message};</p>
		</>
	);
}

export default ErrorBoundryPage;
