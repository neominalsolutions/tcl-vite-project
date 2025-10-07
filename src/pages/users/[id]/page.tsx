import { useParams, useSearchParams } from 'react-router';

function UserDetailPage() {
	const params = useParams(); // dinamik route değerlerini yakalamamızı sağlar. /:id gibi
	const [searchParams] = useSearchParams(); // queryString üzerinden routan veri okuma

	console.log('searchParams', searchParams.get('name'));

	return (
		<>
			<p>Id: {params.id}</p>
			<p>Query Params: {searchParams.get('name')}</p>
		</>
	);
}
export default UserDetailPage;

// 1. UserService içinde /users/1 -> json verisi dönecek bir api request endpoint açılmalı
// 2. sayfa load olduğunda bu bilgileri params.id göre çekilmeli
// 3. user State aktarılıp -> React MUI Componentleri ile Adress ve Company, user bilgileri görsel olarak ekrana yansıtılmalıdır.

// Not: Error Boundary Yarın girelim.
// Redux
// Forms
// Custom Hook.

