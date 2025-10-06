// {name:ali} -> [{name:ali},{name:veli}]
// ekranda ise bu isimleri liste haline mapleyip gösterelim.

import { useState } from 'react';
// <>html elementler</> -> React Fragment -> render sonrası ekranda böyle bir element görünmez.
// <Fragment>html elementler</Fragment> -> <></> aynı şey
// Sadece kapsayıcı amaçlı kullandık.
// <div>jsx</div> -> html element

function TestUIObjectState() {
	const [users, setUsers] = useState<{ name: string }[]>([]); // boş dizi ile başlatıyoruz.

	console.log('TestUIObjectState rendering...');

	const onAddUser = () => {
		// Not: Eğer react da object ve array gibi referans tipli verilerde state güncellemesi yapacaksak
		// mutlaka yeni bir referans oluşturup setState ile güncelleme yapmalıyız.
		// Aksi halde react state'in değiştiğini algılayamaz ve render işlemi tetiklenmez.
		// Bu yüzden aşağıdaki gibi spread operator ile yeni bir dizi oluşturup güncelleme yapıyoruz.
		// users.push({ name: `User-` + Math.round(Math.random() * 1000) });
		// setUsers(users); // state son güncel dizinin değerini setledik.
        // {...obj,{name:'ali'} } -> arr -> [prepend,...arr, append]
		setUsers([...users, { name: `User-` + Math.round(Math.random() * 1000) }]);
	};

	// eğer ekranda listeyi ekrana yansıtmak için map fonksiyonu kullanılır.

	return (
		<>
			<h1>Test UI Object State Component</h1>

			{/* state güncel değerini ekrana yansıttık. */}
			{users.map((user, index) => (
				<div key={index}>
					<p>{user.name}</p>
				</div>
			))}

			<button onClick={onAddUser}>Add </button>
		</>
	);
}

export default TestUIObjectState;
