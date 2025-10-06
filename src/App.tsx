import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TestUI from './components/test-ui';

// Component -> farklı yerlerde tekrar tekrar kullanılabilir ui bileşenleridir.
// React componentleri büyük harfle başlar.
// Componentler fonksiyonel veya class bileşen olabilir.
// Fonksiyonel componentler daha yaygın kullanılır.
// Componentler props alabilir ve state yönetebilir.
// JSX kullanarak componentlerin görünümünü tanımlarız.
// JSX, JavaScript içinde HTML benzeri bir sözdizimidir.
// JSX, Babel tarafından JavaScript'e dönüştürülür.
// JSX kullanarak componentlerin görünümünü tanımlarız.
// JSX, JavaScript ifadelerini süslü parantezler {} içinde kullanmamıza olanak tanır.
// JSX, tek bir kök element döndürmelidir.
// JSX, stil ve sınıf adları için className ve style kullanır.
// JSX, koşullu render ve liste render için JavaScript ifadeleri kullanabiliriz.
// JSX, event handling için onClick, onChange gibi event handler'lar kullanırız.
// JSX, React fragment <></> kullanarak birden fazla elementi sarmalayabiliriz.

function App() {
	// Stateler componentlerin durumunu tutan yapılardır.
	// function componentlerd euseState hook'u ile state tanımlanır.
	// useState bir array döner. İlk eleman state, ikinci eleman state'i güncelleyen fonksiyondur.
	const [count, setCount] = useState(0); // 0 component için durum değişkenin başlangıç değeri.
	// setCount fonksiyonu ile count state'ini güncelleyebiliriz.
	// count ise state'in kendisidir.
	// Hook -> React fonksiyonel componentlerinde yan etkileri yönetmek için kullanılır.
	// Kanca  -> Web uygulamalarında belirli olaylara tepki vermek için kullanılan yapılar.

	console.log('rending...');
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React12</h1>

			{/* custom field */}
			<TestUI />

			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
