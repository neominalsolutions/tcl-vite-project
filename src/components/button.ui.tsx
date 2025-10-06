// Props sadece mounting -> component doma ilk girişinde çalışır.
// Ama mounted olduktan sonra durumunu güncellemesi için props yerine state kullanılmalıdır.

function ButtonUI({
	title,
	onBttnClick,
}: {
	title: string;
	onBttnClick(): void;
}) {
	title = 'Default Title'; // Default value if title is not provided

	const onButtonClick = () => {
		console.log('Button Clicked');
		title = 'Tıklandı'; // This won't work as props are read-only
		onBttnClick(); // event fırlatma
	};

	return <button onClick={onButtonClick}>{title}</button>;
}

export default ButtonUI;

// <ButtonUI title="Click Me" />
