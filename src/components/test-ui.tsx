// Not: TestUI component ismi büyük ama dosya ismi küçük harflerle yazılmıştır.

import { useEffect, useState } from 'react';

// Senaryo iputtan girilen değeri message state'ine atayalım ve ekranda gösterelim.
function TestUI() {
	const [message, setMessage] = useState<string>(''); // boş message state'i
	const [alertVisible, setAlertVisible] = useState<boolean>(false); // default alert mesajı ekranda görünmüyor
	// message = "fdsaf"; -> readonly olmasını sağlar.
	console.log('TestUI rendering...');
	// state takibi yaptığımız hook
	useEffect(() => {
		if (message.length > 10) {
			setAlertVisible(true); // ekranda alert mesajı görünsün
		} else {
			setAlertVisible(false); // ekranda alert mesajı görünmesin
		}
	}, [message]); // [takip edilecek state değişkeni], () => { yan etki fonksiyonu }

	// event binding
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('e', e);
		// e.target.value -> input value
		setMessage(e.target.value);
	};
	// jsx dosyasında anonim değişken fonksiyon tanımlanabilir. ama kullanmayı tercih etmeyiz.
	// eğer alertVisible true ise <div></div> render edilsin. değilse render edilmesin.
	// alertVisible && <div></div> -> koşullu render
	// null değilse de destekler &&
	return (
		<div>
			{alertVisible && (
				<div style={{ color: 'red' }}>Message 10 karakterden uzun olamaz!</div>
			)}
			<h1>Test UI Component</h1>
			<p>This is a test UI component for demonstration purposes.</p>
			{/* model binding */}
			<p>Message: {message}</p>
			{/* event binding  -> anonim */}
			<input onChange={onInputChange} />
		</div>
	);
}

// yazdığım arayüz componenti başka bir ekranda kullanmak için eksport ediyoruz.
export default TestUI;

// React Core bileşnlerden birisi de useEffect hook'tur.
// ekranda render edilen bir state değerinin değişip değişmediğini anlamak için ise useEffect hook kullanılır.
